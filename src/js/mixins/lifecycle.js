"use strict";

/**
 * Module dependencies
 */
import Logger from '../libs/logger';

const LifeCycle = {
	componentWillMount: function() {
		Logger.debug('LifeCycle: componentWillMount');
	},
	componentWillUnmount: function() {
		Logger.debug('LifeCycle: componentWillUnmount');
		this.setState({ isMounted: false });
	},
	componentDidMount: function() {
		Logger.debug('LifeCycle: componentDidMount');
		this.setState({ isMounted: true });
	},
	componentWillReceiveProps: function(nextProps) {
		Logger.debug(`LifeCycle: componentWillReceiveProps => nextProps = ${nextProps}`);
	},
	shouldComponentUpdate: function(nextProps, nextState) {
		Logger.debug(`LifeCycle: shouldComponentUpdate => nextProps = ${nextProps}, nextState = ${nextState}`);
		return true;
	},
	componentWillUpdate: function(nextProps, nextState) {
		Logger.debug(`LifeCycle: componentWillUpdate => nextProps = ${nextProps}, nextState = ${nextState}`);
	},
	componentDidUpdate: function(prevProps, prevState) {
		Logger.debug(`LifeCycle: componentDidUpdate => prevProps = ${prevProps}, prevState = ${prevState}`);
	}
};

export default LifeCycle;