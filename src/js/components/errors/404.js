"use strict";

/**
 * Module dependencies
 */
import React, { Component } from 'react';

class ResourceNotFoundError extends Component {
	displayName: 'ResourceNotFoundError'
	
	propTypes: {
		message: React.PropTypes.string
	}
	
	static get defaultProps() {
		return {
        	message: '404 [ Resource not found ]'
        };
    }
	
    render() {
		const { messsage, ...rest } = this.props;
        return (
            <div {...rest}>{message}</div>
        )
    }
}

export default ResourceNotFoundError;