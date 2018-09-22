"use strict";

/**
 * Module dependencies
 */
import React, { Component } from 'react';

class Flashline extends Component {
	displayName: 'Flashline'
	
	static get defaultProps() {
		return {
        	className: 'flashline'
        };
    }
	
    render() {
		const { message, ...rest } = this.props;
        return (
            <div {...rest}>{message}</div>
        )
    }
}

export default Flashline;