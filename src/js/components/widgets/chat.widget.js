'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
//import PropTypes from 'prop-types';
import { style, classes } from 'typestyle';
import socketIOClient from 'socket.io-client';
//import $ from 'jquery';

import LoaderElement from 'components/elements/loader.element';

import { isNullOrUndefined } from 'libs/helpers.lib';
import Logger from 'libs/logger.lib';

/* @flow */
type Props = {
	dataClass?: Object<any>;
    onConnect: func;
	onDisconnect: func;
};
type State = {
	isAuthorized: boolean;
	isTyping: boolean;
	response: Object<any>;
};

export default class ChatWidget extends Component<Props, State> {
	displayName: string = 'ChatWidget';
	
	state: State = {
	  isAuthorized: false,
	  isTyping: false,
	  response: null
	};
  
  /*var FADE_TIME = 150; // ms
	var TYPING_TIMER_LENGTH = 400; // ms

	// Initialize variables
	var $window = $(window);
	var $usernameInput = $('.usernameInput'); // Input for username
	var $messages = $('.messages'); // Messages area
	var $inputMessage = $('.inputMessage'); // Input message input box

	var $loginPage = $('.login.page'); // The login page
	var $chatPage = $('.chat.page'); // The chatroom page

	// Prompt for setting a username
	var username;
	var connected = false;
	var typing = false;
	var lastTypingTime;
	var $currentInput = $usernameInput.focus();*/
	
  static defaultProps: Props = {
	  className: 'cell',
      dataClass: {
        chatPageClass: 'chat page',
        chatAreaClass: 'chatArea',
        chatMessagesClass: 'messages',
        chatMessageInputClass: 'inputMessage',
        chatLoginPage: 'login page',
        chatNameInputClass: 'usernameInput',
      }
  };
  
  constructor(props: Props): void {
    super(props);
    this.initialize();
	this.onConnect = this.onConnect.bind(this);
	this.onDisconnect = this.onDisconnect.bind(this);
  }

  onConnect(socket: object): func {
    return () => {
      if (this.props.onConnect) {
        this.props.onConnect(socket).call(this);
      }
      socket.on('event', this.onEvent(socket));
      socket.on('login', this.onLogin(socket));
      socket.on('new message', this.onNewMessage(socket));
      socket.on('user joined', this.onUserJoined(socket));
      socket.on('user left', this.onUserLeft(socket));
      socket.on('typing', this.onTyping(socket));
      socket.on('stop typing', this.onStopTyping(socket));
      socket.on('reconnect', this.onReconnect(socket));
      socket.on('reconnect_error', this.onReconnectError(socket));
    };
  }

  onDisconnect(socket: object): func {
    return () => {
      if (this.props.onDisconnect) {
        this.props.onDisconnect(socket).call(this);
      }
      this.log('you have been disconnected');
    };
  }

  onAddUser(socket: object): func {
    return data => {
      Logger.debug(`Data ${data} from socket with id=${socket.id}`);
      if (username) {
        socket.emit('add user', username);
      }
    };
  }

  onLogin(socket: object): func {
    return data => {
      Logger.debug(
        `User with data=${
          data.username
        } logined to chat binded to socket with id=${socket.id}`
      );
      this.setState({ isAuthorized: true });
      this.log(message, { prepend: true });
      this.addParticipantsMessage(data);
    };
  }

  onNewMessage(socket: object): func {
    return data => {
      Logger.debug(
        `New message with data=${
          data.username
        } added to chat binded to socket with id=${socket.id}`
      );
      this.addChatMessage(data);
    };
  }

  onUserJoined(socket: object): func {
    return data => {
      Logger.debug(
        `User with name=${
          data.username
        } joined the chat binded to socket with id=${socket.id}`
      );
      this.log(`${data.username} joined`);
      this.addParticipantsMessage(data);
    };
  }

  onUserLeft(socket: object): func {
    return data => {
      Logger.debug(
        `User with name=${
          data.username
        } left the chat binded to socket with id=${socket.id}`
      );
      this.log(`${data.username} left`);
      this.addParticipantsMessage(data);
      this.removeChatTyping(data);
    };
  }

  onTyping(socket: object): func {
    return data => {
      Logger.debug(`Typing message ${data} to socket with id=${socket.id}`);
      this.addChatTyping(data);
    };
  }

  onStopTyping(socket: object): func {
    return data => {
      Logger.debug(
        `Stop typing message ${data} to socket with id=${socket.id}`
      );
      this.removeChatTyping(data);
    };
  }

  onReconnect(socket: object): func {
    return () => {
      Logger.debug(`Reconnected to socket with id=${socket.id}`);
      this.log('you have been reconnected');
    };
  }

  onReconnectError(socket: object): func {
    return () => {
      Logger.debug(`Cannot reconnect to socket with id=${socket.id}`);
      this.log('attempt to reconnect has failed');
    };
  }

  componentDidMount(): void {
    const socket = socketIOClient(this.props.endpoint);
    socket.on('connect', this.onConnect(socket));
    socket.on('disconnect', this.onDisconnect(socket));
  }

  addParticipantsMessage(data: object): void {
    var message = '';
    if (data.numUsers === 1) {
      message += "there's 1 participant";
    } else {
      message += `there are $(data.numUsers} participants`;
    }
    this.log(message);
  }

  // Sets the client's username
  setUsername(): void {
    username = cleanInput($usernameInput.val().trim());
    if (username) {
      $loginPage.fadeOut();
      $chatPage.show();
      $loginPage.off('click');
      $currentInput = $inputMessage.focus();
      socket.emit('add user', username);
    }
  }

  // Sends a chat message
  sendMessage(): void {
    var message = $inputMessage.val();
    message = cleanInput(message);
    if (message && connected) {
      $inputMessage.val('');
      addChatMessage({
        username: username,
        message: message,
      });
      socket.emit('new message', message);
    }
  }

  // Log a message
  log(message: string, options: object): void {
    var $el = $('<li>')
      .addClass('log')
      .text(message);
    addMessageElement($el, options);
  }

  // Adds the visual chat message to the message list
  addChatMessage(data: object, options: object = {}): void {
    var $typingMessages = getTypingMessages(data);
    //options = options || {};
    if ($typingMessages.length !== 0) {
      options.fade = false;
      $typingMessages.remove();
    }
    var $usernameDiv = $('<span class="username"/>')
      .text(data.username)
      .css('color', getUsernameColor(data.username));
    var $messageBodyDiv = $('<span class="messageBody">').text(data.message);

    var typingClass = data.typing ? 'typing' : '';
    var $messageDiv = $('<li class="message"/>')
      .data('username', data.username)
      .addClass(typingClass)
      .append($usernameDiv, $messageBodyDiv);
    this.addMessageElement($messageDiv, options);
  }

  // Adds the visual chat typing message
  addChatTyping(data: object): void {
    data.typing = true;
    data.message = 'is typing';
    addChatMessage(data);
  }

  // Removes the visual chat typing message
  removeChatTyping(data: object): void {
    getTypingMessages(data).fadeOut(function() {
      $(this).remove();
    });
  }

  // Adds a message element to the messages and scrolls to the bottom
  addMessageElement(el: Node, options: object = {}): void {
    var $el = $(el);
    //if (!options) {
    //	options = {};
    //}
    if (isNullOrUndefined(options.fade)) {
      options.fade = true;
    }
    if (isNullOrUndefined(options.prepend)) {
      options.prepend = false;
    }
    if (options.fade) {
      $el.hide().fadeIn(FADE_TIME);
    }
    if (options.prepend) {
      $messages.prepend($el);
    } else {
      $messages.append($el);
    }
    $messages[0].scrollTop = $messages[0].scrollHeight;
  }

  // Prevents input from having injected markup
  cleanInput(input: string): Node {
    return $('<div/>')
      .text(input)
      .text();
  }

  // Updates the typing event
  updateTyping(): void {
    if (this.state.isAuthorized) {
      if (!this.state.isTyping) {
        this.setState({ isTyping: true });
        socket.emit('typing');
      }
      lastTypingTime = new Date().getTime();

      setTimeout(function() {
        var typingTimer = new Date().getTime();
        var timeDiff = typingTimer - lastTypingTime;
        if (timeDiff >= TYPING_TIMER_LENGTH && this.state.isTyping) {
          socket.emit('stop typing');
          this.setState({ isTyping: false });
        }
      }, TYPING_TIMER_LENGTH);
    }
  }

  // Gets the 'X is typing' messages of a user
  getTypingMessages(data: object): Node {
    return $('.typing.message').filter(function(i) {
      return $(this).data('username') === data.username;
    });
  }

  initialize(): void {
    $window.keydown(function(event) {
      if (!(event.ctrlKey || event.metaKey || event.altKey)) {
        $currentInput.focus();
      }
      if (event.which === 13) {
        if (username) {
          this.sendMessage();
          socket.emit('stop typing');
          this.setState({ isTyping: false });
        } else {
          this.setUsername();
        }
      }
    });

    $inputMessage.on('input', function() {
      this.updateTyping();
    });
    // Focus input when clicking anywhere on login page
    $loginPage.click(function() {
      $currentInput.focus();
    });
    // Focus input when clicking on the message input's border
    $inputMessage.click(function() {
      $inputMessage.focus();
    });
  }

  render(): Node {
    const { className, dataClass, ...rest } = this.props;
    //const response = this.state.response ? <div {...rest}>{this.state.response}</div> : <LoaderElement />;
    //const elements = isConnected ? <div className={className}>{response}</div> : null;
    return (
      <ul className={className}>
        <li className={dataClass.chatPageClass}>
          <div class={dataClass.chatAreaClass}>
            <ul class={dataClass.chatMessagesClass} />
          </div>
          <input
            class={dataClass.chatMessageInputClass}
            placeholder="Type here..."
          />
        </li>
        <li class={dataClass.chatLoginPage}>
          <div class="form">
            <h3 class="title">What's your nickname?</h3>
            <input
              class={dataClass.chatNameInputClass}
              type="text"
              maxlength="14"
            />
          </div>
        </li>
      </ul>
    );
  }
};
