"use strict";

/**
 * Module dependencies
 */
import React, { Component } from 'react';

import Logger from '../libs/logger';
//import { createReactClass } from 'create-react-class';

export default function wrapper(WrappedComponent) {
  	//return createReactClass({
		return new Component {
			
			constructor(props) {
				super(props);
				this.state = { isMounted: false };
			}
			
			componentWillMount() {
				Logger.debug('componentWillMount');
			},
			componentDidMount() {
				Logger.debug('componentDidMount');
				this.setState({ isMounted: true });
			},
			componentWillUnmount() {
				Logger.debug('componentWillUnmount');
				this.setState({ isMounted: false });
			},
			componentWillReceiveProps(nextProps) {
				Logger.debug('componentWillReceiveProps', { nextProps: nextProps });
			},
			shouldComponentUpdate(nextProps, nextState) {
				Logger.debug('shouldComponentUpdate', { nextProps: nextProps, nextState: nextState });
				return true;
			},
			componentWillUpdate(nextProps, nextState) {
				Logger.debug('componentWillUpdate', { nextProps: nextProps, nextState: nextState });
			},
			componentDidUpdate(prevProps, prevState) {
				Logger.debug('componentDidUpdate', { prevProps: prevProps, prevState: prevState });
			},
			render() {
				return (
					<WrappedComponent isMounted={this.state.isMounted} {...this.props} />
				);
			}
		};
  	//});
};