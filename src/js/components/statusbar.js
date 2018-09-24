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
		const { message, children, ...rest } = this.props;
		const messages = message ? <div>{message}</div> : '';
	const childs = children ? <div>{children}</div> : '';
        return (
            <div {...rest}>
				{messages}
				{childs}
			</div>
        )
    }
}

export default StatusBar;