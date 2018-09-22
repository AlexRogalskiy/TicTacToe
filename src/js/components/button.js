"use strict";

/**
 * Module dependencies
 */
import React, { Component } from 'react';

class Button extends Component {
	displayName: 'Button'
	
	static get defaultProps() {
		return {
        	className: 'button'
        };
    }
	
    render() {
		const {label, onPress, ...rest} = this.props;
        return (
            <div onClick={onPress} {...rest}>{label}</div>
        )
    }
}

export default Button;