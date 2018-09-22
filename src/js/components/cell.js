"use strict";

/**
 * Module dependencies
 */
import React, { Component } from 'react';
import { style, classes } from 'typestyle';

class Cell extends React.Component {
	displayName: 'Cell'
	
	propTypes: {
		winnerClassName: React.PropTypes.string
	}
	
	constructor(props) {
		super(props);
		this.state = { isWinner: false };
	}
	
	static get defaultProps() {
		return {
        	className: 'cell',
			winnerClassName: 'cell-winner'
        };
    }

    render() {
		const { onPress, winnerClassName, state, ...rest } = this.props;
		const className = classes(
			this.props.className,
			this.state.isWinner && winnerClassName
		);
        return (
            <div onClick={onPress} className={className} {...rest}>{state}</div>
        )
    }
}

export default Cell;