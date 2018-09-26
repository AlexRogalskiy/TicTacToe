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
			dataClass: PropTypes.object
			//onConnect: PropTypes.func,
			//onDisconnect: PropTypes.func
		};
	}

	static get defaultProps() {
		return {
        	className: 'board-widget',
			dataClass: { boardWidgetInfo: 'board-widget-info' }
			//onConnect: this.onConnect,
			//onDisconnect: this.onDisconnect
        };
    }
	
	constructor(props) {
		super(props);
		this.state = { isStart: false, isEnded: false, isReset: false, isSetCell: false, response: null };
	}
	
	onConnect(socket) {
		return () => {
			if(this.props.onConnect) {
				this.props.onConnect(socket).call(this);
			}
			socket.on('start', this.onStart(socket));
			socket.on('setcell', this.onSetCell(socket));
			socket.on('reset', this.onReset(socket));
			socket.on('initialize', this.onInitialize(socket));
			socket.on('finalize', this.onFinalize(socket));
			
			this.onEmitConnect = this.onEmitConnect(socket);
			this.onEmitDisconnect = this.onEmitDisconnect(socket);
			this.onEmitStart = this.onEmitStart(socket);
			this.onEmitSetCell = this.onEmitSetCell(socket);
			this.onEmitReset = this.onEmitReset(socket);
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
			this.setState({ isStart: true, response: data });
			if(this.props.onStart) {
				this.props.onStart(socket).call(this, data);
			}
	    };
	}
	
	onSetCell(socket) {
		return data => {
			Logger.debug(tag`onSetCell: data ${data} from socket with id=${socket.id}`);
			this.setState({ isSetCell: true, response: data });
			if(this.props.onSetCell) {
				this.props.onSetCell(socket).call(this, data);
			}
	    };
	}
	
	onReset(socket) {
		return () => {
			Logger.debug(tag`onReset: reset from socket with id=${socket.id}`);
			this.setState({ isReset: true, response: null });
			if(this.props.onReset) {
				this.props.onReset(socket).call(this);
			}
	    };
	}
	
	onInitialize(socket) {
		return () => {
			Logger.debug(`onInitialize: reset from socket with id=${socket.id}`);
			this.setState({ isStart: false, isEnded: false, isReset: false, isSetCell: false, response: null });
			if(this.props.onInitialize) {
				this.props.onInitialize(socket).call(this);
			}
	    };
	}
	
	onFinalize(socket) {
		return () => {
			Logger.debug(`onFinalize: reset from socket with id=${socket.id}`);
			this.setState({ isStart: false, isEnded: true, isReset: false, isSetCell: false, response: null });
			if(this.props.onFinalize) {
				this.props.onFinalize(socket).call(this);
			}
	    };
	}
	
	onEmitConnect(socket) {
		return () => {
			Logger.debug(tag`onEmitConnect: connect to socket with id=${socket.id}`);
			socket.emit('initialize');
			//if(this.props.onConnect) {
			//	this.props.onConnect.call(this);
			//}
		};
	}
	
	onEmitDisconnect(socket) {
		return () => {
			Logger.debug(tag`onEmitDisconnect: disconnect from socket with id=${socket.id}`);
			socket.emit('finalize');
			//if(this.props.onDisconnect) {
			//	this.props.onDisconnect.call(this);
			//}
		};
	}
	
	onEmitStart(socket) {
		return data => {
			Logger.debug(tag`onEmitStart: data ${data} to socket with id=${socket.id}`);
			socket.emit('start', data);
			if(this.props.onStart) {
				this.props.onStart.call(this, data);
			}
		};
	}
	
	onEmitSetCell(socket) {
		return (cell, cells, player) => {
			if(!this.state.isEnded) {
				Logger.debug(tag`onEmitSetCell: data ${{cell, cells, player}} to socket with id=${socket.id}`);
				socket.emit('setcell', { cell, cells, player });
				if(this.props.onSetCell) {
					this.props.onSetCell.call(this, cell, cells, player);
				}
			}
		};
	}
	
	onEmitReset(socket) {
		return () => {
			Logger.debug(tag`onEmitReset: reset to socket with id=${socket.id}`);
			socket.emit('reset');
			if(this.props.onReset) {
				this.props.onReset.call(this);
			}
		};
	}
	
	componentDidMount() {
		const socket = socketIOClient(this.props.endpoint);
		socket.on('connect', this.onConnect(socket));
		socket.on('disconnect', this.onDisconnect(socket));
	}
	
    render() {
		const { className, dataClass, message, isConnected, onConnect, onDisconnect, onStart, onSetCell, onReset, onInitialize, onFinalize, ...rest} = this.props;
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