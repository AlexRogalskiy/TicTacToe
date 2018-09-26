"use strict";

/**
 * Module dependencies
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Logger } from '../libs/logger';

export default function wrapper(WrappedComponent) {
  	return class extends Component {
		
		get displayName() {
			return 'SocketWrapper';
		}
	
		static get propTypes() {
			return {
				endpoint: PropTypes.string.isRequired
			};
		}
		
		static get defaultProps() {
			return {
				endpoint: 'http://localhost:8080/'
			};
		}
		
		constructor(props) {
			super(props);
			this.onConnect = this.onConnect.bind(this);
			this.onDisconnect = this.onDisconnect.bind(this);
			this.state = { isConnected: false };
		}
		
		onConnect(socket) {
			return () => {
				Logger.debug(`onConnect: connected by socket with id=${socket.id}`);
				this.setState({ isConnected: true });
			};
		}
		
		onDisconnect(socket) {
			return () => {
				Logger.debug(`onDisconnect: disconnected from socket with id=${socket.id}`);
				this.setState({ isConnected: false });
			};
		}
		
		render() {
			return (
				<WrappedComponent isConnected={this.state.isConnected} onConnect={this.onConnect} onDisconnect={this.onDisconnect} />
			);
		}
  	};
};
