"use strict";

/**
 * Module dependencies
 */
import React, { Component } from 'react';

import Logger from '../libs/logger';
//import { createReactClass } from 'create-react-class';

export default function wrapper(WrappedComponent) {
	let emptyFunction = function() {};
  	//return createReactClass({
		return new Component {
			
			constructor(props) {
				super(props);
				this.state = { isMounted: false, isActivated: false };
			}
			
			componentWillAppear: function(callback) {
				Logger.debug('componentWillAppear');
				callback = typeof callback === "function" ? callback : emptyFunction;
				this.setState({ isMounted: true });
				callback();
			},
			componentDidAppear: function() {
				Logger.debug('componentDidAppear');
			},
			componentWillEnter: function(callback) {
				Logger.debug('componentWillEnter');
				callback = typeof callback === "function" ? callback : emptyFunction;
				this.setState({ isActivated: true });
				callback();
			},
			componentDidEnter: function() {
				Logger.debug('componentDidEnter');
			},
			componentWillLeave: function(callback) {
				Logger.debug('componentWillLeave');
				callback = typeof callback === "function" ? callback : emptyFunction;
				this.setState({ isActivated: false });
				callback();
			},
			componentDidLeave: function() {
				Logger.debug('componentDidLeave');
			},
			render() {
				return (
					<WrappedComponent isMounted={this.state.isMounted} isActivated={this.state.isActivated} {...this.props} />
				);
			}
		};
  	//});
};
