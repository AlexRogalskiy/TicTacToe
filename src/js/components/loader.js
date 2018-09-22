"use strict";

/**
 * Module dependencies
 */
import React, { Component } from 'react';

class Loader extends Component {
	displayName: 'Loader'
	
	propTypes: {
		dataClass: React.PropTypes.object
	}
	
	static get defaultProps() {
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