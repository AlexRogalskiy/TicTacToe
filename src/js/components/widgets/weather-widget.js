"use strict";

/**
 * Module dependencies
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import socketIOClient from 'socket.io-client';

import Loader from '../loader';
import { Logger, tag } from '../../libs/logger';

class WeatherWidget extends Component {
	
	get displayName() {
		return 'WeatherWidget';
	}
	
	static get propTypes() {
		return {
			dataClass: PropTypes.object
		};
	}
	
	static get defaultProps() {
		return {
        	className: 'weather-widget',
			dataClass: { weatherWidgetInfo: 'weather-widget-info' }
        };
    }
	
	constructor(props) {
		super(props);
		this.state = { response: null };
	}
	
	onConnect(socket) {
		return () => {
			if(this.props.onConnect) {
				this.props.onConnect(socket).call(this);
			}
			socket.on('event', this.onEvent(socket));
	    };
	}
	
	onDisconnect(socket) {
		return () => {
			if(this.props.onDisconnect) {
				this.props.onDisconnect(socket).call(this);
			}
	    };
	}
	
	onEvent(socket) {
		return data => {
			Logger.debug(tag`onEvent: data ${data} from socket with id=${socket.id}`);
			this.setState({ response: data });
	    };
	}
	
	componentDidMount() {
		const socket = socketIOClient(this.props.endpoint);
		socket.on('connect', this.onConnect(socket));
		socket.on('disconnect', this.onDisconnect(socket));
	}
	
	render() {
		const { className, dataClass, isConnected, onConnect, onDisconnect, ...rest } = this.props;
		rest.className = dataClass.weatherWidgetInfo;
		const response = this.state.response ? <div {...rest}>{this.state.response}</div> : <Loader />;
		const elements = isConnected ? <div className={className}>{response}</div> : null;
		return (
			<>
				{ elements }
			</>
		);
	}
}

export default WeatherWidget;