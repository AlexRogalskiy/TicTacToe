'use strict';

/**
 * Module dependencies
 */
import socketIOClient from 'socket.io-client';

import { Logger } from '../libs/logger';

const Socket = {
  socket: socketIOClient(this.props.endpoint),
  defaultProps: 'http://localhost:8080/',

  onConnect: function(socket) {
    return () => {
      Logger.debug(`Connected by socket with id=${socket.id}`);
      this.setState({ isConnected: true });
      if (this.props.onConnect) {
        this.props.onConnect(socket);
      }
    };
  },

  onDisconnect: function(socket) {
    return () => {
      Logger.debug(`Disconnected from socket with id=${socket.id}`);
      this.setState({ isConnected: false });
      if (this.props.onDisconnect) {
        this.props.onDisconnect(socket);
      }
    };
  },

  componentDidMount: function() {
    const socket = socketIOClient(this.props.endpoint);
    socket.on('connect', this.onConnect(socket));
    socket.on('disconnect', this.onDisconnect(socket));
  },
};

export default Socket;
