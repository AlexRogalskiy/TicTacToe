'use strict';

/**
 * Module dependencies
 */
import socketIOClient from 'socket.io-client';

import Logger from 'app-root/libs/logger';

export default class Socket {
	
  socket = socketIOClient(this.props.endpoint)
  defaultProps = 'http://localhost:8080/'

  get displayName() {
    return 'Socket';
  }
  
  onConnect(socket) {
    return () => {
      Logger.debug(`Connected by socket with id=${socket.id}`);
      this.setState({ isConnected: true });
      if (this.props.onConnect) {
        this.props.onConnect(socket);
      }
    };
  }

  onDisconnect(socket) {
    return () => {
      Logger.debug(`Disconnected from socket with id=${socket.id}`);
      this.setState({ isConnected: false });
      if (this.props.onDisconnect) {
        this.props.onDisconnect(socket);
      }
    };
  }

  componentDidMount() {
    const socket = socketIOClient(this.props.endpoint);
    socket.on('connect', this.onConnect(socket));
    socket.on('disconnect', this.onDisconnect(socket));
  }
};
