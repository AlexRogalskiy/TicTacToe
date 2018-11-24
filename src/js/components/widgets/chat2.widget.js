'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
//import PropTypes from 'prop-types';
import { style, classes } from 'typestyle';

import * as RxDB from 'rxdb';
import * as moment from 'moment';
import { QueryChangeDetector } from 'rxdb';
import { ToastContainer, toast } from 'react-toastify';
// The following line is not needed for react-toastify v3, only for v2.2.1
//import 'react-toastify/dist/ReactToastify.min.css';

import Chat2Schema from 'schemas/chat2.schema';
import { Elements } from 'libs/elements.lib';
import { isNullOrUndefined } from 'libs/helpers.lib';
import Logger from 'libs/logger.lib';

QueryChangeDetector.enable();
QueryChangeDetector.enableDebugging();

RxDB.plugin(require('pouchdb-adapter-idb'));
RxDB.plugin(require('pouchdb-adapter-http'));

const syncURL = 'http://localhost:5984/';
const dbName = 'chat2db';

/* @flow */
type Props = {
	dataClass?: Object<any>;
    onConnect: func;
	onDisconnect: func;
};
type Message = string;
type State = {
	isAuthorized?: boolean;
	isTyping?: boolean;
	newMessage: Message;
	messages: Array<Message>;
};

export default class Chat2Widget extends Component<Props, State> {
	displayName: string = 'Chat2Widget';
	
	state: State = {
	  isAuthorized: false,
	  isTyping: false,
	  newMessage: '',
	  messages: []
	};
	
	subs: Array<any> = [];
	
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
		this.addMessage = this.addMessage.bind(this);
		this.handleMessageChange = this.handleMessageChange.bind(this);
	}

	async createDatabase(): void {
		// password must have at least 8 characters
		const db = await RxDB.create(
		  {name: dbName, adapter: 'idb', password: '12345678'}
		);
		  Logger.dir(db);

		// show who's the leader in page's title
		db.waitForLeadership().then(() => {
		  document.title = '♛ ' + document.title;
		});

		// create collection
		const messagesCollection = await db.collection({
		  name: 'messages',
		  schema: schema
		});

		// set up replication
		const replicationState = 
		  messagesCollection.sync({ remote: syncURL + dbName + '/' });
		this.subs.push(
		  replicationState.change$.subscribe(change => {
			toast('Replication change');
			Logger.dir(change)
		  })
		);
		this.subs.push(
		replicationState.docs$.subscribe(docData => Logger.dir(docData))
		);
		this.subs.push(
		  replicationState.active$.subscribe(active => toast(`Replication active: ${active}`))
		);
		this.subs.push(
		  replicationState.complete$.subscribe(completed => toast(`Replication completed: ${completed}`))
		);
		this.subs.push(
		  replicationState.error$.subscribe(error => {
			toast('Replication Error');
			Logger.dir(error)
		  })
		);
		return db;
	}

	async componentDidMount(): void {
		this.db = await this.createDatabase();
		// Subscribe to query to get all messages
		const sub = 
		  this.db.messages.find().sort({id: 1}).$.subscribe(messages => {
		  if (!messages)
			return;
		  toast('Reloading messages');
		  this.setState({messages: messages});
		});
		this.subs.push(sub);
	}
	
	componentWillUnmount(): void {
		// Unsubscribe from all subscriptions
		this.subs.forEach(sub => sub.unsubscribe());
	}

	renderMessages(): Node {
		return this.state.messages.map(({id, message}) => {
		  const date = moment(id, 'x').fromNow();
		  return (
			<Elements.View key={id}>
			  <Elements.Paragraph>{date}</Elements.Paragraph>
			  <Elements.Paragraph>{message}</Elements.Paragraph>
			  <Elements.Line />
			</Elements.View>
		  );
		});
	}

	handleMessageChange(event: SyntheticEvent<HTMLInputElement>): void {
		this.setState({newMessage: event.target.value});
	}
	
	async addMessage() {
		const id = Date.now().toString();
		const newMessage = {id, message: this.state.newMessage};
		await this.db.messages.insert(newMessage);
		this.setState({newMessage: ''});
	}

	render(): Node {
		const { className, dataClass, ...rest } = this.props;
		//const response = this.state.response ? <Elements.View {...rest}>{this.state.response}</Elements.View> : <LoaderElement />;
		//const elements = isConnected ? <Elements.View className={className}>{response}</Elements.View> : null;
		return (
		  <Elements.View className="App">
			<ToastContainer autoClose={3000} />
			<Elements.View className="App-header">
			  <Elements.Image src={logo} className="App-logo" alt="logo" />
			  <Elements.Head_2>Welcome to React</Elements.Head_2>
			</Elements.View>

			<Elements.View>{this.renderMessages()}</Elements.View>

			<Elements.View id="add-message-div">
			  <Elements.Head_3>Add Message</Elements.Head_3>
			  <Elements.Control type="text" placeholder="Message" value={this.state.newMessage} onChange={this.handleMessageChange} />
			  <Elements.Button onClick={this.addMessage}>Add message</Elements.Button>
			</Elements.View>
		  </Elements.View>
		);
	}
};
