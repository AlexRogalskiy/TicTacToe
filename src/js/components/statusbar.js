"use strict";

/**
 * Module dependencies
 */
import React, { Component } from 'react';

class StatusBar extends Component {
	
	get displayName() {
		return 'StatusBar';
	}
	
	static get defaultProps() {
		return {
        	className: 'statusbar'
        };
    }
	
    render() {
		const { message, ...rest } = this.props;
        return (
            <div {...rest}>{message}</div>
        )
    }
}

export default StatusBar;