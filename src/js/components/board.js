"use strict";

/**
 * Module dependencies
 */
import React, { Component } from 'react';

import Cell from './cell';
import Button from './button';
import Flashline from './flashline';
import Grid from './grid';

class Board extends Component {
	displayName: 'Board'

	static get defaultProps() {
		return {
        	className: 'board'
        };
    }
	
    render() {
        const self = this;
		const {message, className, ...rest} = this.props;
        return (
            <div className={className}>
                <Flashline message={message} />
				<Grid {...rest} />
                <div className="panel">
                    <Button label="Reset" className="button button-reset" onPress={(e) => {
                        self.props.onReset()
                    }} />
                </div>
            </div>
        )
    }
}

export default Board;