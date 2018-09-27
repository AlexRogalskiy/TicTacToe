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
			dataClass: { boardWidgetInfo: 'board-widget-info', boardWidgetStatus: 'board-widget-status', boardWidgetMessage: 'board-widget-message' }
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
		this.onReject = this.onReject.bind(this);
		this.state = { isReject: false, isStart: false, isPlayerFirst: false, isPlayerSecond: false, isEnded: false, isReset: false, isSetCell: false, response: null };
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
				this.props.onSetCell(socket).call(this, { cell: data.cell, cells: data.cells, player: data.player, room: data.room });
			}
	    };
	}
	
	onReset(socket) {
		return data => {
			Logger.debug(`onReset: reset from socket with id=${socket.id}`);
			this.setState({ isReset: true, response: data });
			if(this.props.onReset) {
				this.props.onReset(socket).call(this);
			}
	    };
	}
	
	onInitialize(socket) {
		return data => {
			Logger.debug(tag`onInitialize: initialize with data=${data} from socket with id=${socket.id}`);
			this.setState({ isReject: false, isStart: false, isEnded: false, isReset: false, isSetCell: false, response: null });
			if(this.props.onInitialize) {
				this.props.onInitialize(socket).call(this, data);
			}
	    };
	}
	
	onFinalize(socket) {
		return data => {
			Logger.debug(tag`onFinalize: finalize with data=${data} from socket with id=${socket.id}`);
			this.setState({ isReject: false, isStart: false, isEnded: true, isReset: false, isSetCell: false, response: null });
			if(this.props.onFinalize) {
				this.props.onFinalize(socket).call(this, data);
			}
	    };
	}
	
	onReject(socket) {
		return data => {
			Logger.debug(tag`onReject: reject with data=${data} from socket with id=${socket.id}`);
			this.setState({ isReject: true, response: data });
			if(this.props.onReject) {
				this.props.onReject(socket).call(this, data);
			}
	    };
	}
	
	onPlayerFirst(socket) {
		return data => {
			Logger.debug(tag`onPlayerFirst: player first with data=${data} from socket with id=${socket.id}`);
			this.setState({ isPlayerFirst: true, isSetCell: true, response: data });
			if(this.props.onPlayerFirst) {
				this.props.onPlayerFirst(socket).call(this, data);
			}
	    };
	}
	
	onPlayerSecond(socket) {
		return data => {
			Logger.debug(tag`onPlayerSecond: player second with data=${data} from socket with id=${socket.id}`);
			this.setState({ isPlayerSecond: true, isSetCell: false, response: data });
			if(this.props.onPlayerSecond) {
				this.props.onPlayerSecond(socket).call(this, data);
			}
	    };
	}
	
	onEmitConnect(socket) {
		return () => {
			Logger.debug(`onEmitConnect: connect to socket with id=${socket.id}`);
			socket.emit('initialize');
			//if(this.props.onConnect) {
			//	this.props.onConnect.call(this);
			//}
		};
	}
	
	onEmitDisconnect(socket) {
		return () => {
			Logger.debug(`onEmitDisconnect: disconnect from socket with id=${socket.id}`);
			socket.emit('finalize');
			//if(this.props.onDisconnect) {
			//	this.props.onDisconnect.call(this);
			//}
		};
	}
	
	onEmitStart(socket) {
		return data => {
			Logger.debug(tag`onEmitStart: start with data ${data} to socket with id=${socket.id}`);
			//console.log(this.props.location.hash);
			socket.emit('start', data);
			if(this.props.onStart) {
				this.props.onStart.call(this, data);
			}
		};
	}
	
	onEmitSetCell(socket) {
		return data => {
			if(!this.props.roundFinished && this.state.isSetCell) {
				Logger.debug(tag`onEmitSetCell: setcell with data ${data} to socket with id=${socket.id}`);
				socket.emit('setcell', { cell: data.cell, cells: data.cells, player: data.player, room: this.state.response.room });
				this.setState({ isSetCell: false });
				if(this.props.onSetCell) {
					this.props.onSetCell.call(this, { cell: data.cell, cells: data.cells, player: data.player, room: this.state.response.room });
				}
			}
		};
	}
	
	onEmitReset(socket) {
		return data => {
			Logger.debug(`onEmitReset: reset from socket with id=${socket.id}`);
			socket.emit('reset', { room: data.room });
			if(this.props.onReset) {
				this.props.onReset.call(this, { room: data.room });
			}
			this.onEmitFinalize({ board: this.props.board, cells: this.props.cells, player: this.props.player, room: this.state.response.room });
		};
	}
	
	onEmitInitialize(socket) {
		return data => {
			if(this.props.location.hash) {
				data.board.id = this.props.location.hash.substr(1);
			}
			Logger.debug(tag`onEmitInitialize: initialize with data=${data} to socket with id=${socket.id}`);
			socket.emit('initialize', { board: data.board, cells: data.cells, player: data.player });
			if(this.props.onInitialize) {
				this.props.onInitialize.call(this, { board: data.board, cells: data.cells, player: data.player });
			}
		};
	}
	
	onEmitFinalize(socket) {
		return data => {
			Logger.debug(tag`onEmitFinalize: finalize with data=${data} to socket with id=${socket.id}`);
			socket.emit('finalize', { board: data.board, cells: data.cells, player: data.player, room: this.state.response.room });
			if(this.props.onFinalize) {
				this.props.onFinalize.call(this, { board: data.board, cells: data.cells, player: data.player, room: this.state.response.room });
			}
			this.onDisconnect();
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
		socket.on('reject', this.onReject(socket));
		
		socket.on('player first', this.onPlayerFirst(socket));
		socket.on('player second', this.onPlayerSecond(socket));
		
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
        return (
            <div className={className}>
				{
					isConnected
						?	<div>
								<div className={dataClass.boardWidgetInfo}>{board.message}</div>
								{
									this.state.isStart
										?	<div>
												<div className="panel">
												{
													(!this.state.isReject && !this.state.isPlayerSecond)
														?	<Button label="Join" className="button" onPress={(e) => this.onEmitStart({ player: this.props.player, room: this.state.response.room })} />
														: 	<div className={dataClass.boardWidgetStatus}>
															{
																(this.state.isPlayerFirst && this.state.isPlayerSecond)
																	? 	<div>
																			<StatusBar message={message} />
																			<div className={dataClass.boardWidgetMessage}>
																				Connected ...
																			</div>
																			<Grid onSetCell={this.onEmitSetCell} {...rest} />
																			<div className="panel">
																				<Button label="Reset" className="button button-reset" onPress={(e) => this.onEmitReset({ room: this.state.response.room })} />
																			</div>
																		</div>
																	:	<div className={dataClass.boardWidgetMessage}>
																			Waiting for the second player ...
																		</div>
															
															}
															</div>
												}
												</div>
											</div>
										: 	<div className={dataClass.boardWidgetMessage}>
												Connecting to playground
											</div>
								}
							</div>
						: 	<div className={dataClass.boardWidgetMessage}>
								Connecting to play server
							</div>
				}
            </div>
        )
    }
}

export default BoardWidget;