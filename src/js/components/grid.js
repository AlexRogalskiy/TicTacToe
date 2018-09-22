"use strict";

/**
 * Module dependencies
 */
import React, { Component } from 'react';

import Cell from './cell';

class Grid extends Component {
	displayName: 'Grid'
	
	static get defaultProps() {
		return {
        	className: 'grid'
        };
    }
	
	render() {
        const self = this;
        return (
			<div className={this.props.className}>
                {
                    this.props.cells.map((value, cell) => (
                        <Cell key={cell} state={value} onPress={(e) => {
                             self.props.onSetCell(cell, this.props.cells, this.props.player)
                        }}/>
                    ))
                }
             </div>
		)
	}	
}

export default Grid;