"use strict";

/**
 * Module dependencies
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Loader extends Component {
	
	get displayName() {
		return 'Loader';
	}
	
	static get propTypes() {
		return {
			dataClass: PropTypes.object
		};
	}
	
	get static defaultProps() {
		return {
        	className: 'loader'
			dataClass: { containerClass: 'loader-container' },
        };
	}
	
	render() {
		const { className, dataClass, ...rest } = this.props;
		rest.className = dataClass.containerClass;
		return (
			<div className={className}>
				<div {...rest}>
					<aside></aside>
					<aside></aside>
					<aside></aside>
					<aside></aside>
					<aside></aside>
				</div>
			</div>
		);
    }
}

export default Loader;