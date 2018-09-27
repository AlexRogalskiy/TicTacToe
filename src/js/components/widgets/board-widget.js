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
		};
	}

	static get defaultProps() {
		return {
        	className: 'board-widget',
			dataClass: { boardWidgetInfo: 'board-widget-info' }
        };
    }
	
	constructor(props) {
		super(props);
		this.onConnect = this.onConnect.bind(this);
		this.onDisconnect = this.onDisconnect.bind(this);
		this.onStart = this.onStart.bind(this);
		this.onSetCell = this.onSetCell.bind(this);
		this.onInitialize = this.onInitialize.bind(this);
		this.onFinalize = this.onFinalize.bind(this);
		this.onError = this.onError.bind(this);
		this.state = { isError: false, isStart: false, isEnded: false, isReset: false, isSetCell: false, response: null };
	}
	
	onConnect(socket) {
		return () => {
			if(this.props.onConnect) {
				this.props.onConnect(socket).call(this);
			}
			this.onEmitInitialize({ board: this.props.board, cells: this.props.cells, player: this.props.player });
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
			Logger.debug(tag`onStart: start with data ${data} from socket with id=${socket.id}`);
			this.setState({ isStart: true, response: data });
			if(this.props.onStart) {
				this.props.onStart.call(this, data);
			}
	    };
	}
	
	onSetCell(socket) {
		return data => {
			Logger.debug(tag`onSetCell: set cell with data ${data} from socket with id=${socket.id}`);
			this.setState({ isSetCell: true, isEnded: this.props.roundFinished, response: data });
			if(this.props.onSetCell) {
				this.props.onSetCell(socket).call(this, data.cell, data.cells, data.player);
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
		return (data) => {
			Logger.debug(`onInitialize: initialize with data=${data} from socket with id=${socket.id}`);
			this.setState({ isError: false, isStart: false, isEnded: false, isReset: false, isSetCell: false, response: null });
			if(this.props.onInitialize) {
				this.props.onInitialize(socket).call(this, data);
			}
	    };
	}
	
	onFinalize(socket) {
		return (data) => {
			Logger.debug(`onFinalize: finalize with data=${data} from socket with id=${socket.id}`);
			this.setState({ isError: false, isStart: false, isEnded: true, isReset: false, isSetCell: false, response: null });
			if(this.props.onFinalize) {
				this.props.onFinalize(socket).call(this, data);
			}
	    };
	}
	
	onError(socket) {
		return (data) => {
			Logger.debug(`onError: error with data=${data} from socket with id=${socket.id}`);
			this.setState({ isError: true, response: data });
			if(this.props.onError) {
				this.props.onError(socket).call(this, data);
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
			Logger.debug(tag`onEmitStart: start with data ${data} to socket with id=${socket.id}`);
			socket.emit('start', data);
			if(this.props.onStart) {
				this.props.onStart.call(this, data);
			}
		};
	}
	
	onEmitSetCell(socket) {
		return (cell, cells, player) => {
			if(!this.props.roundFinished) {
				Logger.debug(tag`onEmitSetCell: setcell with data ${{cell, cells, player}} to socket with id=${socket.id}`);
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
	
	onEmitInitialize(socket) {
		return (data) => {
			Logger.debug(tag`onEmitInitialize: initialize with data=${data} to socket with id=${socket.id}`);
			socket.emit('initialize', { board: data.board, cells: data.cells, player: data.player });
			if(this.props.onInitialize) {
				this.props.onInitialize.call(this, data);
			}
		};
	}
	
	onEmitFinalize(socket) {
		return (data) => {
			Logger.debug(tag`onEmitFinalize: finalize with data=${data} to socket with id=${socket.id}`);
			socket.emit('finalize', { board: data.board, cells: data.cells, player: data.player });
			if(this.props.onFinalize) {
				this.props.onFinalize.call(this, data);
			}
		};
	}
	
	componentDidMount() {
		const socket = socketIOClient(this.props.endpoint);
		socket.on('connect', this.onConnect(socket));
		socket.on('disconnect', this.onDisconnect(socket));
		
		socket.on('start', this.onStart(socket));
		socket.on('setcell', this.onSetCell(socket));
		socket.on('reset', this.onReset(socket));
		socket.on('initialize', this.onInitialize(socket));
		socket.on('finalize', this.onFinalize(socket));
		socket.on('error', this.onError(socket));
		
		this.onEmitConnect = this.onEmitConnect(socket);
		this.onEmitDisconnect = this.onEmitDisconnect(socket);
		this.onEmitStart = this.onEmitStart(socket);
		this.onEmitSetCell = this.onEmitSetCell(socket);
		this.onEmitReset = this.onEmitReset(socket);
		
		this.onEmitInitialize = this.onEmitInitialize(socket);
		this.onEmitFinalize = this.onEmitFinalize(socket);
	}
	
    render() {
		const { className, dataClass, roundFinished, board, message, isConnected, onConnect, onDisconnect, onStart, onSetCell, onReset, onInitialize, onFinalize, ...rest } = this.props;
		//const response = this.state.response ? <div {...rest}>{this.state.response}</div> : <Loader />;
		//const elements = isConnected ? <div className={className}>{response}</div> : null;
		//if(this.state.isStart && !this.state.isError && !this.state.isReset) this.onEmitStart(this.props.player, this.state.response.room);
        return (
            <>
				{
					isConnected
						?	<div className={className}>
								<div className={dataClass.boardWidgetInfo}>{board.message}</div>
								<StatusBar message={message} />
								<Grid onSetCell={this.onEmitSetCell} {...rest} />
								<div className="panel">
									<Button label="Reset" className="button button-reset" onPress={(e) => this.onEmitReset()} />
								</div>
							</div>
						: null
				}
            </>
        )
    }
}

export default BoardWidget;