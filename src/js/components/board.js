"use strict";

/**
 * Module dependencies
 */
import React, { Component } from 'react';

import Button from './button';
import StatusBar from './statusbar';
import Grid from './grid';
import SocketConnector from './socket-connector';

class Board extends Component {
	
	get displayName() {
		return 'Board';
	}

	static get defaultProps() {
		return {
        	className: 'board'
        };
    }
	
    render() {
		const {message, className, onReset, ...rest} = this.props;
        return (
            <div className={className}>
                <StatusBar message={message} />
				<SocketConnector />
				<Grid {...rest} />
                <div className="panel">
                    <Button label="Reset" className="button button-reset" onPress={(e) => {onReset()}} />
                </div>
            </div>
        )
    }
}

export default Board;