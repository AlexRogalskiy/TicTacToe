"use strict";

/**
 * Module dependencies
 */
import React, { Component } from 'react';

import Cell from './cell';

class Grid extends Component {
	
	get displayName() {
		return 'Grid';
	}
	
	static get defaultProps() {
		return {
        	className: 'grid'
        };
    }
	
	render() {
		const { cells, player, onSetCell, winningState, ...rest } = this.props;
        return (
			<div {...rest}>
                {
                    cells.map((value, cell) => (
                        <Cell key={cell} state={value} isWinner={winningState && winningState.includes(cell) ? true : false} onPress={(e) => {
                             onSetCell(cell, cells, player)
                        }}/>
                    ))
                }
             </div>
		)
	}	
}

export default Grid;