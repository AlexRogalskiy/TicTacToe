"use strict";

/**
 * Module dependencies
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import socketIOClient from 'socket.io-client';

//import Loader from './loader';

import Button from '../button';
import StatusBar from '../statusbar';
import Grid from '../grid';

import { Logger, tag } from '../../libs/logger';

class BoardWidget extends Component {
	
	get displayName() {
		return 'BoardWidget';
	}
	
	static get propTypes() {
		return {
			dataClass: PropTypes.object,
			onConnect: PropTypes.func,
			onDisconnect: PropTypes.func
		};
	}

	static get defaultProps() {
		return {
        	className: 'board-widget',
			dataClass: { boardWidgetInfo: 'board-widget-info' },
			onConnect: this.onConnect,
			onDisconnect: this.onDisconnect
        };
    }
	
	constructor(props) {
		super(props);
		this.state = { isReset: false, isSetCell: false, response: null };
	}
	
	onConnect(socket) {
		return () => {
			if(this.props.onConnect) {
				this.props.onConnect(socket).call(this);
			}
			socket.on('start', this.onStart(socket));
			socket.on('setcell', this.onSetCell(socket));
			socket.on('reset', this.onReset(socket));
			this.onEmitReset = this.onEmitReset(socket);
			this.onEmitSetCell = this.onEmitSetCell(socket);
			//socket.emit('initialize');
	    };
	}
	
	onDisconnect(socket) {
		return () => {
			if(this.props.onDisconnect) {
				this.props.onDisconnect(socket).call(this);
			}
			//socket.emit('finalize');
	    };
	}
		
	onStart(socket) {
		return data => {
			Logger.debug(tag`onStart: data ${data} from socket with id=${socket.id}`);
			this.setState({ response: data });
	    };
	}
	
	onSetCell(socket) {
		return data => {
			Logger.debug(tag`onSetCell: data ${data} from socket with id=${socket.id}`);
			this.setState({ response: data });
	    };
	}
	
	onReset(socket) {
		return data => {
			Logger.debug(tag`onReset: data ${data} from socket with id=${socket.id}`);
			this.setState({ response: data });
	    };
	}
	
	onEmitReset(socket) {
		return () => {
			Logger.debug(tag`onEmitReset: reset to socket with id=${socket.id}`);
			this.setState({ isReset: true });
			socket.emit('reset');
			if(this.props.onReset) {
				this.props.onReset.call(this);
			}
		};
	}
	
	onEmitSetCell(socket) {
		return (cell, cells, player) => {
			Logger.debug(tag`onEmitSetCell: data ${{cell, cells, player}} to socket with id=${socket.id}`);
			this.setState({ isSetCell: true });
			socket.emit('setcell', { cell, cells, player });
			if(this.props.onSetCell) {
				this.props.onSetCell.call(this, cell, cells, player);
			}
		};
	}
	
	componentDidMount() {
		const socket = socketIOClient(this.props.endpoint);
		socket.on('connect', this.onConnect(socket));
		socket.on('disconnect', this.onDisconnect(socket));
	}
	
    render() {
		const { className, dataClass, message, onReset, onSetCell, isConnected, onConnect, onDisconnect, ...rest} = this.props;
		//const response = this.state.response ? <div {...rest}>{this.state.response}</div> : <Loader />;
		//const elements = isConnected ? <div className={className}>{response}</div> : null;
        return (
            <div className={className}>
				<StatusBar message={message} />
				<Grid onSetCell={this.onEmitSetCell} {...rest} />
				<div className="panel">
					<Button label="Reset" className="button button-reset" onPress={(e) => this.onEmitReset()} />
				</div>
            </div>
        )
    }
}

export default BoardWidget;