"use strict";

/**
 * Module dependencies
 */
//import React, { Component } from 'react';
import { createReactClass } from 'create-react-class';

import Logger, { tag } from '../libs/logger';
import { isFunction } from '../libs/helpers';

export default function wrapper(WrappedComponent) {
	let emptyFunction = function() {};
	
  	return createReactClass({
			displayName: "TransitionWrapper"
			
			constructor(props) {
				super(props);
				this.state = { isMounted: false, isActivated: false };
			}
			
			componentWillAppear(callback) {
				Logger.debug('componentWillAppear');
				callback = isFunction(callback) ? callback : emptyFunction;
				this.setState({ isMounted: true });
				callback();
			}
			componentDidAppear() {
				Logger.debug('componentDidAppear');
			}
			componentWillEnter(callback) {
				Logger.debug('componentWillEnter');
				callback = isFunction(callback) ? callback : emptyFunction;
				this.setState({ isActivated: true });
				callback();
			}
			componentDidEnter() {
				Logger.debug('componentDidEnter');
			}
			componentWillLeave(callback) {
				Logger.debug('componentWillLeave');
				callback = isFunction(callback) ? callback : emptyFunction;
				this.setState({ isActivated: false });
				callback();
			}
			componentDidLeave() {
				Logger.debug('componentDidLeave');
			}
			
			render() {
				return (
					<WrappedComponent isMounted={this.state.isMounted} isActivated={this.state.isActivated} {...this.props} />
				);
			}
  	});
};
