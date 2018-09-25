"use strict";

/**
 * Module dependencies
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import socketIOClient from 'socket.io-client';

import Loader from './loader';
import { Logger } from '../libs/logger';

class SocketConnector extends Component {
	
	get displayName() {
		return 'SocketConnector';
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
	
	constructor() {
		super();
		this.state = { connected: false, response: false };
	}
	
	onConnect(socket) {
		return () => {
			Logger.debug(`Connected by socket with id=${socket.id}`);
			this.setState({ connected: true });
	    };
	}
	
	onEvent(socket) {
		return data => {
			Logger.debug(`Data ${data} from socket with id=${socket.id}`);
			this.setState({ response: data });
	    };
	}
	
	onDisconnect(socket) {
		return () => {
			Logger.debug(`Disconnected from socket with id=${socket.id}`);
			this.setState({ connected: false });
	    };
	}
	
	componentDidMount() {
		const socket = socketIOClient(this.props.endpoint);
		socket.on('connect', this.onConnect(socket));
		socket.on('event', this.onEvent(socket));
		socket.on('disconnect', this.onDisconnect(socket));
	}
	
	render() {
		const { connected, response } = this.state;
		return (
			<div style={{ textAlign: "center" }}>
				{	
					response
						? <div>{response}</div>
						: <Loader />
				}
			</div>
		);
	}
}

export default SocketConnector;