'use strict';

/**
 * Module dependencies
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import socketIOClient from 'socket.io-client';

import ButtonBlock from 'app-root/components/controls/button-block';
import Loader from 'app-root/components/elements/loader';
import StatusBar from 'app-root/components/elements/statusbar';
import Grid from 'app-root/components/elements/grid';

import Logger, { tag } from 'app-root/libs/logger';

export default class BoardWidget extends Component {
  get displayName() {
    return 'BoardWidget';
  }

  static get propTypes() {
    return {
      dataClass: PropTypes.object,
    };
  }

  static get defaultProps() {
    return {
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
    };
  }

  constructor(props) {
    super(props);
    this.DEFAULT_SETTINGS = {
      SERVER_CONNECTION_PLACEHOLDER: 'Connecting to play server ...',
      BOARD_CONNECTION_PLACEHOLDER: 'Connecting to play ground ...',
    };

    this.onConnect = this.onConnect.bind(this);
    this.onDisconnect = this.onDisconnect.bind(this);
    this.onStart = this.onStart.bind(this);
    this.onSetCell = this.onSetCell.bind(this);
    this.onInitialize = this.onInitialize.bind(this);
    this.onFinalize = this.onFinalize.bind(this);
    this.onReject = this.onReject.bind(this);
    this.state = {
      isReject: false,
      isStart: false,
      isPlayerFirst: false,
      isPlayerSecond: false,
      isEnded: false,
      isReset: false,
      isSetCell: false,
      response: null,
    };
  }

  onConnect(socket) {
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

  onDisconnect(socket) {
    return () => {
      if (this.props.onDisconnect) {
        this.props.onDisconnect(socket).call(this);
      }
    };
  }

  onStart(socket) {
    return data => {
      Logger.debug(
        tag`onStart: <start> with data ${data} from socket with id=${socket.id}`
      );
      this.setState({ isStart: true, response: data });
      if (this.props.onStart) {
        this.props.onStart.call(this, data);
      }
    };
  }

  onSetCell(socket) {
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
          cell: data.cell,
          cells: data.cells,
          player: data.player,
          room: data.room,
        });
      }
    };
  }

  onReset(socket) {
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

  onInitialize(socket) {
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

  onFinalize(socket) {
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

  onReject(socket) {
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

  onPlayerFirst(socket) {
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

  onPlayerSecond(socket) {
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

  onEmitConnect(socket) {
    return () => {
      Logger.debug(`onEmitConnect: <connect> to socket with id=${socket.id}`);
      socket.emit('initialize');
    };
  }

  onEmitDisconnect(socket) {
    return () => {
      Logger.debug(
        `onEmitDisconnect: <disconnect> from socket with id=${socket.id}`
      );
      socket.emit('finalize');
    };
  }

  onEmitStart(socket) {
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

  onEmitSetCell(socket) {
    return data => {
      if (!this.props.roundFinished && this.state.isSetCell) {
        Logger.debug(
          tag`onEmitSetCell: <setcell> with data ${data} to socket with id=${
            socket.id
          }`
        );
        socket.emit('setcell', {
          cell: data.cell,
          cells: data.cells,
          player: data.player,
          room: this.state.response.room,
        });
        this.setState({ isSetCell: false });
        if (this.props.onSetCell) {
          this.props.onSetCell.call(this, {
            cell: data.cell,
            cells: data.cells,
            player: data.player,
            room: this.state.response.room,
          });
        }
      }
    };
  }

  onEmitReset(socket) {
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

  onEmitPlayerFirst(socket) {
    return data => {
      Logger.debug(
        tag`onEmitPlayerFirst: <player first> with data=${data} to socket with id=${
          socket.id
        }`
      );
      socket.emit('player first', {
        player: data.player,
        room: this.state.response.room,
      }); //board: data.board, cells: data.cells,
      if (this.props.onPlayerFirst) {
        this.props.onPlayerFirst.call(this, {
          player: data.player,
          room: this.state.response.room,
        });
      }
    };
  }

  onEmitPlayerSecond(socket) {
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

  onEmitInitialize(socket) {
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
      });
      if (this.props.onInitialize) {
        this.props.onInitialize.call(this, {
          board: data.board,
          cells: data.cells,
          player: data.player,
        });
      }
    };
  }

  onEmitFinalize(socket) {
    return data => {
      Logger.debug(
        tag`onEmitFinalize: <finalize> with data=${data} to socket with id=${
          socket.id
        }`
      );
      socket.emit('finalize', {
        board: data.board,
        cells: data.cells,
        player: data.player,
        room: this.state.response.room,
      });
      if (this.props.onFinalize) {
        this.props.onFinalize.call(this, {
          board: data.board,
          cells: data.cells,
          player: data.player,
          room: this.state.response.room,
        });
      }
    };
  }

  componentDidMount() {
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

  renderServiceMessage(message, animated = true) {
    return (
      <div className={this.props.dataClass.boardWidgetPanel}>
        <div className={this.props.dataClass.boardWidgetMessage}>{message}</div>
        {animated ? (
          <Loader className={this.props.dataClass.boardWidgetLoader} />
        ) : null}
      </div>
    );
  }

  render() {
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
      <div className={className}>
        {isConnected ? (
          <div className={dataClass.boardWidgetPlayground}>
            <div className={dataClass.boardWidgetInfo}>{board.message}</div>
            {this.state.isStart ? (
              <div className={dataClass.boardWidgetLayout}>
                {!this.state.isReject && !this.state.isPlayerSecond ? (
                  <ButtonBlock
                    label="Join"
                    className="button"
                    onClick={e =>
                      this.onEmitStart({
                        player: this.props.player,
                        room: this.state.response.room,
                      })
                    }
                  />
                ) : (
                  <div className={dataClass.boardWidgetStatus}>
                    {this.state.isPlayerFirst && this.state.isPlayerSecond ? (
                      <div className={dataClass.boardWidgetPanel}>
                        <StatusBar message={message} />
                        {this.renderServiceMessage(
                          this.state.response.message,
                          false
                        )}
                        <Grid onSetCell={this.onEmitSetCell} {...rest} />
                        <div className="panel">
                          <ButtonBlock
                            label="Reset"
                            className="button button-reset"
                            onClick={e =>
                              this.onEmitReset({
                                room: this.state.response.room,
                              })
                            }
                          />
                        </div>
                      </div>
                    ) : (
                      <div className={dataClass.boardWidgetPanel}>
                        {this.state.isReject
                          ? this.renderServiceMessage(
                              this.state.response.message,
                              false
                            )
                          : this.renderServiceMessage(
                              this.state.response.message,
                              !this.state.isEnded
                            )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className={dataClass.boardWidgetLayout}>
                {this.state.isEnded || this.state.isReset
                  ? this.renderServiceMessage(
                      this.state.response.message,
                      false
                    )
                  : this.renderServiceMessage(
                      this.DEFAULT_SETTINGS.BOARD_CONNECTION_PLACEHOLDER
                    )}
              </div>
            )}
          </div>
        ) : (
          this.renderServiceMessage(
            this.DEFAULT_SETTINGS.SERVER_CONNECTION_PLACEHOLDER
          )
        )}
      </div>
    );
  }
};
