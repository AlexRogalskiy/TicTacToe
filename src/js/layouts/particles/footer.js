"use strict";

/**
 * Module dependencies
 */
import React, { Component } from 'react';

class Footer extends Component {
	displayName: 'Footer'
	
	static get defaultProps() {
		return {
        	className: 'footer'
        };
    }

    render() {
		const { children, ...rest } = this.props;
        return  (
			<div {...rest}>
				{children}
			</div>
		)
    }
}

export default Footer;