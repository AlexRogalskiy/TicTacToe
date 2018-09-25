"use strict";

/**
 * Module dependencies
 */
import React, { Component } from 'react';

class Header extends Component {
	
	get displayName() {
		return 'Header';
	}
	
	static get defaultProps() {
		return {
        	className: 'header'
        };
    }
	
    render() {
		const { children, ...rest } = this.props;
        return  (
			<header {...rest}>
				{children}
			</header>
		)
    }
}

export default Header;