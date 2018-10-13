'use strict';

/**
 * Module dependencies
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import socketIOClient from 'socket.io-client';

import Logger from 'app-root/libs/logger';

export default class SocketConnector extends Component {
  get displayName() {
    return 'SocketConnector';
  }

  static get propTypes() {
    return {
      endpoint: PropTypes.string.isRequired,
    };
  }

  static get defaultProps() {
    return {
      endpoint: 'http://localhost:8080/',
    };
  }

  constructor(props) {
    super(props);
    this.state = { isConnected: false };
  }

  onConnect(socket) {
    return () => {
      Logger.debug(`onConnect: <connect> by socket with id=${socket.id}`);
      this.setState({ isConnected: true });
      if (this.props.onConnect) {
        this.props.onConnect(socket).call(this);
      }
    };
  }

  onDisconnect(socket) {
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

  componentDidMount() {
    const socket = socketIOClient(this.props.endpoint);
    socket.on('connect', this.onConnect(socket));
    socket.on('disconnect', this.onDisconnect(socket));
  }
};
