"use strict";

/**
 * Module dependencies
 */
//import React, { Component } from 'react';
import { createReactClass } from 'create-react-class';

import Logger, { tag } from '../libs/logger';

export default function wrapper(WrappedComponent) {
  	return createReactClass({
			displayName: "LifeCycleWrapper"
			
			constructor(props) {
				super(props);
				this.state = { isMounted: false };
			}	
			componentWillMount() {
				Logger.debug(tag`LifeCycle: componentWillMount`);
				this.setState({ isMounted: false });
			}
			componentWillUnmount() {
				Logger.debug(tag`LifeCycle: componentWillUnmount`);
				this.setState({ isMounted: false });
			}
			componentDidMount() {
				Logger.debug(tag`LifeCycle: componentDidMount`);
				this.setState({ isMounted: true });
			}
			componentWillReceiveProps(nextProps) {
				Logger.debug(tag`LifeCycle: componentWillReceiveProps => nextProps = ${nextProps}`);
			}
			shouldComponentUpdate(nextProps, nextState) {
				Logger.debug(tag`LifeCycle: shouldComponentUpdate => nextProps = ${nextProps}, nextState = ${nextState}`);
				return true;
			}
			componentWillUpdate(nextProps, nextState) {
				Logger.debug(tag`LifeCycle: componentWillUpdate => nextProps = ${nextProps}, nextState = ${nextState}`);
			}
			componentDidUpdate(prevProps, prevState) {
				Logger.debug(tag`LifeCycle: componentDidUpdate => prevProps = ${prevProps}, prevState = ${prevState}`);
			}
			
			render() {
				return (
					<WrappedComponent isMounted={this.state.isMounted} {...this.props} />
				);
			}
  	});
};