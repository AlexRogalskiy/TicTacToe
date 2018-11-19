'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
//import PropTypes from 'prop-types';
import { style, classes } from 'typestyle';
import socketIOClient from 'socket.io-client';

import Logger from 'app-root/libs/logger';

type Props = {
  endpoint: string,
  onConnect?: func,
  onDisconnect?: func
};
type State = {
  isConnected: bool	
}

export default class SocketConnector extends Component<Props, State> {
  displayName: string = 'SocketConnector';

  state: State = {
	  isConnected: false
  };
  
  static defaultProps: Props = {
      endpoint: 'http://localhost:8080/'
  };

  onConnect(socket: object): func {
    return () => {
      Logger.debug(`onConnect: <connect> by socket with id=${socket.id}`);
      this.setState({ isConnected: true });
      if (this.props.onConnect) {
        this.props.onConnect(socket).call(this);
      }
    };
  }

  onDisconnect(socket: object): func {
    return () => {
      Logger.debug(
        `onDisconnect: <disconnect> from socket with id=${socket.id}`
      );
      this.setState({ isConnected: false });
      if (this.props.onDisconnect) {
        this.props.onDisconnect(socket).call(this);
      }
    };
  }

  componentDidMount(): void {
    const socket = socketIOClient(this.props.endpoint);
    socket.on('connect', this.onConnect(socket));
    socket.on('disconnect', this.onDisconnect(socket));
  }
};
