'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
//import PropTypes from 'prop-types';
import { style, classes } from 'typestyle';
import socketIOClient from 'socket.io-client';

import ButtonBlockControl from 'components/controls/button-block.control';
import LoaderElement from 'components/elements/loader.element';
import StatusBarElement from 'components/elements/statusbar.element';
import GridElement from 'components/elements/grid.element';

import type { Board, Player, Cells } from 'types/tictactoe.type';

import { Elements } from 'libs/elements.lib';
import Logger, { tag } from 'libs/logger.lib';

/* @flow */
type Props = {
	dataClass?: Object<any>;
	board?: Board;
	cells?: Cells;
	player?: Player;
	roundFinished?: boolean;
	message?: string;
	
	onConnect?: func;
	onDisconnect?: func;
	onStart?: func;
	onSetCell?: func;
	onInitialize?: func;
	onFinalize?: func;
	onReject?: func;
	onReset?: func;
	onPlayerFirst?: func;
	onPlayerSecond?: func;
};
type State = {
	  isReject: boolean;
      isStart: boolean;
      isPlayerFirst: boolean;
      isPlayerSecond: boolean;
      isEnded: boolean;
      isReset: boolean;
      isSetCell: boolean;
      response: Object<any>;
};

export default class BoardWidget extends Component<Props, State> {
  displayName: string = 'BoardWidget';

  DEFAULT_MESSAGES: Object<any> = {
     SERVER_CONNECTION_PLACEHOLDER: 'Connecting to play server ...',
     BOARD_CONNECTION_PLACEHOLDER: 'Connecting to play ground ...',
  };
   
  state: State = {
	  isReject: false,
      isStart: false,
      isPlayerFirst: false,
      isPlayerSecond: false,
      isEnded: false,
      isReset: false,
      isSetCell: false,
      response: null
  };
  
  static defaultProps: Props = {
	 className: 'board-widget',
      dataClass: {
        boardWidgetInfo: 'board-widget-info',
        boardWidgetPlayground: 'board-widget-playground',
        boardWidgetStatus: 'board-widget-status',
        boardWidgetMessage: 'board-widget-message',
        boardWidgetPanel: 'board-widget-panel',
        boardWidgetLayout: 'board-widget-layout',
        boardWidgetLoader: 'loader board-widget-loader',
      },
	  roundFinished: false
  };

  constructor(props: Props): void {
    super(props);
    this.onConnect = this.onConnect.bind(this);
    this.onDisconnect = this.onDisconnect.bind(this);
    this.onStart = this.onStart.bind(this);
    this.onSetCell = this.onSetCell.bind(this);
    this.onInitialize = this.onInitialize.bind(this);
    this.onFinalize = this.onFinalize.bind(this);
    this.onReject = this.onReject.bind(this);
    this.onReset = this.onReset.bind(this);
  }

  onConnect(socket: Object<any>): func {
    return () => {
      if (this.props.onConnect) {
        this.props.onConnect(socket).call(this);
      }
      this.onEmitInitialize({
        board: this.props.board,
        cells: this.props.cells,
        player: this.props.player,
      });
    };
  }

  onDisconnect(socket: Object<any>): func {
    return () => {
      if (this.props.onDisconnect) {
        this.props.onDisconnect(socket).call(this);
      }
    };
  }

  onStart(socket: Object<any>): func {
    return data => {
      Logger.debug(
        tag`onStart: <start> with data ${data} from socket with id=${socket.id}`
      );
      if(this._mounted) {
		  this.setState({ isStart: true, response: data });
	  }
      if (this.props.onStart) {
        this.props.onStart.call(this, data);
      }
    };
  }

  onSetCell(socket: Object<any>): func {
    return data => {
      Logger.debug(
        tag`onSetCell: <setcell> with data=${data} from socket with id=${
          socket.id
        }`
      );
      this.setState({
        isSetCell: true,
        isEnded: this.props.roundFinished,
        response: data,
      });
      if (this.props.onSetCell) {
        this.props.onSetCell.call(this, {
          position: data.position,
          cells: data.cells,
          player: data.player,
          room: data.room,
        });
      }
    };
  }

  onReset(socket: Object<any>): func {
    return data => {
      if (!this.state.isReset) {
        Logger.debug(
          tag`onReset: <reset> with data=${data} from socket with id=${
            socket.id
          }`
        );
        this.setState({ isStart: false, isReset: true, response: data });
        this.onEmitFinalize(data);
        if (this.props.onReset) {
          this.props.onReset.call(this, data);
        }
      }
    };
  }

  onInitialize(socket: Object<any>): func {
    return data => {
      Logger.debug(
        tag`onInitialize: <initialize> with data=${data} from socket with id=${
          socket.id
        }`
      );
      this.setState({
        isReject: false,
        isStart: false,
        isEnded: false,
        isReset: false,
        isSetCell: false,
        response: data,
      });
      if (this.props.onInitialize) {
        this.props.onInitialize.call(this, data);
      }
    };
  }

  onFinalize(socket: Object<any>): func {
    return data => {
      if (!this.state.isEnded) {
        Logger.debug(
          tag`onFinalize: <finalize> with data=${data} from socket with id=${
            socket.id
          }`
        );
        this.setState({
          isReject: false,
          isStart: false,
          isEnded: true,
          isReset: false,
          isSetCell: false,
          response: data,
        });
        socket.emit('disconnect');
        if (this.props.onFinalize) {
          this.props.onFinalize.call(this, data);
        }
      }
    };
  }

  onReject(socket: Object<any>): func {
    return data => {
      Logger.debug(
        tag`onReject: <reject> with data=${data} from socket with id=${
          socket.id
        }`
      );
      this.setState({ isReject: true, response: data });
      if (this.props.onReject) {
        this.props.onReject.call(this, data);
      }
    };
  }

  onPlayerFirst(socket: Object<any>): func {
    return data => {
      if (!this.state.isPlayerFirst) {
        Logger.debug(
          tag`onPlayerFirst: <player first> with data=${data} from socket with id=${
            socket.id
          }`
        );
        this.setState({ isPlayerFirst: true, isSetCell: true, response: data });
        this.onEmitPlayerFirst(data);
        if (this.props.onPlayerFirst) {
          this.props.onPlayerFirst.call(this, data);
        }
      }
    };
  }

  onPlayerSecond(socket: Object<any>): func {
    return data => {
      Logger.debug(
        tag`onPlayerSecond: <player second> with data=${data} from socket with id=${
          socket.id
        }`
      );
      this.setState({ isPlayerSecond: true, isSetCell: false, response: data });
      if (this.props.onPlayerSecond) {
        this.props.onPlayerSecond.call(this, data);
      }
    };
  }

  onEmitConnect(socket: Object<any>): func {
    return () => {
      Logger.debug(`onEmitConnect: <connect> to socket with id=${socket.id}`);
      socket.emit('initialize');
    };
  }

  onEmitDisconnect(socket: Object<any>): func {
    return () => {
      Logger.debug(
        `onEmitDisconnect: <disconnect> from socket with id=${socket.id}`
      );
      socket.emit('finalize');
    };
  }

  onEmitStart(socket: Object<any>): func {
    return data => {
      Logger.debug(
        tag`onEmitStart: <start> with data ${data} to socket with id=${
          socket.id
        }`
      );
      socket.emit('start', data);
      if (this.props.onStart) {
        this.props.onStart.call(this, data);
      }
    };
  }

  onEmitSetCell(socket: Object<any>): func {
    return data => {
      if (!this.props.roundFinished && this.state.isSetCell) {
        Logger.debug(
          tag`onEmitSetCell: <setcell> with data ${data} to socket with id=${
            socket.id
          }`
        );
        socket.emit('setcell', {
          position: data.position,
          cells: data.cells,
          player: data.player,
          room: this.state.response.room,
        });
        this.setState({ isSetCell: false });
        if (this.props.onSetCell) {
          this.props.onSetCell.call(this, {
            position: data.position,
            cells: data.cells,
            player: data.player,
            room: this.state.response.room,
          });
        }
      }
    };
  }

  onEmitReset(socket: Object<any>): func {
    return data => {
      Logger.debug(
        tag`onEmitReset: <reset> with data=${data} from socket with id=${
          socket.id
        }`
      );
      socket.emit('reset', { room: data.room });
      if (this.props.onReset) {
        this.props.onReset.call(this, { room: data.room });
      }
    };
  }

  onEmitPlayerFirst(socket: Object<any>): func {
    return data => {
      Logger.debug(
        tag`onEmitPlayerFirst: <player first> with data=${data} to socket with id=${
          socket.id
        }`
      );
      socket.emit('player first', {
		board: data.board,
		cells: data.cells,
        player: data.player,
        room: data.room
      });
      if (this.props.onPlayerFirst) {
        this.props.onPlayerFirst.call(this, {
			board: data.board,
			cells: data.cells,
			player: data.player,
			room: data.room
        });
      }
    };
  }

  onEmitPlayerSecond(socket: Object<any>): func {
    return data => {
      Logger.debug(
        tag`onEmitPlayerSecond: <player second> with data=${data} to socket with id=${
          socket.id
        }`
      );
      socket.emit('player second', {
        player: data.player,
        room: this.state.response.room,
      }); //board: data.board, cells: data.cells,
      if (this.props.onPlayerSecond) {
        this.props.onPlayerSecond.call(this, {
          player: data.player,
          room: this.state.response.room,
        });
      }
    };
  }

  onEmitInitialize(socket: Object<any>): func {
    return data => {
      Logger.debug(
        tag`onEmitInitialize: <initialize> with data=${data} to socket with id=${
          socket.id
        }`
      );
      if (this.props.location.hash) {
        data.board.id = this.props.location.hash.substr(1);
      }
      socket.emit('initialize', {
        board: data.board,
        cells: data.cells,
        player: data.player,
		room: data.board && data.board.id
      });
      if (this.props.onInitialize) {
        this.props.onInitialize.call(this, {
          board: data.board,
          cells: data.cells,
          player: data.player,
		  room: data.board && data.board.id
        });
      }
    };
  }

  onEmitFinalize(socket: Object<any>): func {
    return data => {
      Logger.debug(
        tag`onEmitFinalize: <finalize> with data=${data} to socket with id=${
          socket.id
        }`
      );
      socket.emit('finalize', {
        room: this.state.response.room
      });
      if (this.props.onFinalize) {
        this.props.onFinalize.call(this, {
          room: this.state.response && this.state.response.room
        });
      }
    };
  }
  
  componentWillUnmount(): void {
     this._mounted = false;
  }

  componentDidMount(): void {
	this._mounted = true;
	
    const socket = socketIOClient(this.props.endpoint);
    socket.on('connect', this.onConnect(socket));
    socket.on('disconnect', this.onDisconnect(socket));

    socket.on('start', this.onStart(socket));
    socket.on('setcell', this.onSetCell(socket));
    socket.on('reset', this.onReset(socket));
    socket.on('initialize', this.onInitialize(socket));
    socket.on('finalize', this.onFinalize(socket));
    socket.on('reject', this.onReject(socket));

    socket.on('player first', this.onPlayerFirst(socket));
    socket.on('player second', this.onPlayerSecond(socket));

    this.onEmitConnect = this.onEmitConnect(socket);
    this.onEmitDisconnect = this.onEmitDisconnect(socket);
    this.onEmitStart = this.onEmitStart(socket);
    this.onEmitSetCell = this.onEmitSetCell(socket);
    this.onEmitReset = this.onEmitReset(socket);
    this.onEmitPlayerFirst = this.onEmitPlayerFirst(socket);
    this.onEmitPlayerSecond = this.onEmitPlayerSecond(socket);
    this.onEmitInitialize = this.onEmitInitialize(socket);
    this.onEmitFinalize = this.onEmitFinalize(socket);
  }

  renderServiceMessage(message: string, animated: bool = true): Node {
    return (
      <div className={this.props.dataClass.boardWidgetPanel}>
        <div className={this.props.dataClass.boardWidgetMessage}>{message}</div>
        {animated ? (
          <LoaderElement className={this.props.dataClass.boardWidgetLoader} />
        ) : null}
      </div>
    );
  }

  render(): Node {
    const {
      staticContext,
      className,
      dataClass,
      roundFinished,
      board,
      message,
      isConnected,
      onConnect,
      onDisconnect,
      onStart,
      onSetCell,
      onReset,
      onInitialize,
      onFinalize,
      ...rest
    } = this.props;
    return (
      <Elements.View className={className}>
        {isConnected ? (
          <Elements.View className={dataClass.boardWidgetPlayground}>
            <Elements.View className={dataClass.boardWidgetInfo}>{board.message}</Elements.View>
            {this.state.isStart ? (
              <Elements.View className={dataClass.boardWidgetLayout}>
                {!this.state.isReject && !this.state.isPlayerSecond ? (
                  <ButtonBlockControl
                    label="Join"
                    className="button"
                    onClick={e =>
                      this.onEmitStart({
						board: this.props.board,
						cells: this.props.cells,
                        player: this.props.player,
                        room: this.state.response.room
                      })
                    }
                  />
                ) : (
                  <Elements.View className={dataClass.boardWidgetStatus}>
                    {this.state.isPlayerFirst && this.state.isPlayerSecond ? (
                      <Elements.View className={dataClass.boardWidgetPanel}>
                        <StatusBarElement message={message} />
                        {this.renderServiceMessage(
                          this.state.response.message,
                          false
                        )}
                        <GridElement onSetCell={this.onEmitSetCell} {...rest} />
                        <Elements.View className="panel">
                          <ButtonBlockControl
                            label="Reset"
                            className="button button-reset"
                            onClick={e =>
                              this.onEmitReset({
                                room: this.state.response.room
                              })
                            }
                          />
                        </Elements.View>
                      </Elements.View>
                    ) : (
                      <Elements.View className={dataClass.boardWidgetPanel}>
                        {this.state.isReject
                          ? this.renderServiceMessage(
                              this.state.response.message,
                              false
                            )
                          : this.renderServiceMessage(
                              this.state.response.message,
                              !this.state.isEnded
                            )}
                      </Elements.View>
                    )}
                  </Elements.View>
                )}
              </Elements.View>
            ) : (
              <Elements.View className={dataClass.boardWidgetLayout}>
                {this.state.isEnded || this.state.isReset
                  ? this.renderServiceMessage(
                      this.state.response.message,
                      false
                    )
                  : this.renderServiceMessage(
                      this.DEFAULT_MESSAGES.BOARD_CONNECTION_PLACEHOLDER
                    )}
              </Elements.View>
            )}
          </Elements.View>
        ) : (
          this.renderServiceMessage(
            this.DEFAULT_MESSAGES.SERVER_CONNECTION_PLACEHOLDER
          )
        )}
      </Elements.View>
    );
  }
};
