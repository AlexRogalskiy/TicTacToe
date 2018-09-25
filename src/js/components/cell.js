"use strict";

/**
 * Module dependencies
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { style, classes } from 'typestyle';

class Cell extends Component {
	
	get displayName() {
		return 'Cell';
	}
	
	static get propTypes() {
		return {
			dataClass: PropTypes.object,
			isWinner: PropTypes.bool
		};
	}
	
	static get defaultProps() {
		return {
        	className: 'cell',
			dataClass: { winnerClass: 'cell-winner' },
			isWinner: false
        };
    }
	
	constructor(props) {
		super(props);
	}

    render() {
		const { className, onPress, dataClass, state, isWinner, ...rest } = this.props;
		const cellClassName = classes(
			className,
			isWinner && dataClass.winnerClass
		);
        return (
            <div onClick={onPress} className={cellClassName} {...rest}>{state}</div>
        )
    }
}

export default Cell;