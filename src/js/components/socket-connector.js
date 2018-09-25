"use strict";

/**
 * Module dependencies
 */
import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';

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
	
	componentDidMount() {
		const socket = socketIOClient(this.props.endpoint);
		socket.on('FromAPI', (data) => this.setState({ response: data }));
	}
	
	render() {
		const { response } = this.state;
		return (
			<div style={{ textAlign: "center" }}>
				{	
					response
						? <p>The temperature in Florence is: {response} °F</p>
						: <p>Loading...</p>
				}
			</div>
		);
	}
}

export default SocketConnector;