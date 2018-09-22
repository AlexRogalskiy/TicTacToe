"use strict";

/**
 * Module dependencies
 */
import React, { Component } from 'react';

class InternalServerError extends Component {
	displayName: 'InternalServerError'
	
	propTypes: {
		message: React.PropTypes.string
	}
	
	static get defaultProps() {
		return {
        	message: '503 [ Internal server error ]'
        };
    }
	
    render() {
		const { messsage, ...rest } = this.props;
        return (
            <div {...rest}>{message}</div>
        )
    }
}

export default InternalServerError;