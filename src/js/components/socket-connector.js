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
		this.state = { response: false };
	}
	
	onConnect() {
		Logger.debug(`Connected by socket id = ${socket.id}`);
	}
	
	onEvent(data) {
		Logger.debug(`Data ${data} from socket id=${socket.id}`);
		this.setState({ response: data });
	}
	
	onDisconnect() {
		Logger.debug(`Disconnected from socket id=${socket.id}`);
	}
	
	componentDidMount() {
		const socket = socketIOClient(this.props.endpoint);
		socket.on('connect', this.onConnect);
		socket.on('event', this.onEvent);
		socket.on('disconnect', this.onDisconnect);
	}
	
	render() {
		const { response } = this.state;
		return (
			<div style={{ textAlign: "center" }}>
				{	
					response
						? <p>The temperature in Florence is: {response} °F</p>
						: <Loader />
				}
			</div>
		);
	}
}

export default SocketConnector;