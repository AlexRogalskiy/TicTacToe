'use strict';

/**
 * Module dependencies
 */
import socketIOClient from 'socket.io-client';

import Logger from 'app-root/libs/logger.lib';

export default class SocketMixin {
  displayName(): string = 'SocketMixin';
  
  onConnect(socket: object): func {
    return () => {
      Logger.debug(`Connected by socket with id=${socket.id}`);
      this.setState({ isConnected: true });
      if (this.props.onConnect) {
        this.props.onConnect(socket);
      }
    };
  }

  onDisconnect(socket: object): func {
    return () => {
      Logger.debug(`Disconnected from socket with id=${socket.id}`);
      this.setState({ isConnected: false });
      if (this.props.onDisconnect) {
        this.props.onDisconnect(socket);
      }
    };
  }

  componentDidMount(): void {
    const socket = socketIOClient(this.props.endpoint);
    socket.on('connect', this.onConnect(socket));
    socket.on('disconnect', this.onDisconnect(socket));
  }
};
