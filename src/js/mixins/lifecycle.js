"use strict";

/**
 * Module dependencies
 */
import Logger, { tag } from '../libs/logger';

const LifeCycle = {
	componentWillMount: function() {
		Logger.debug(tag`LifeCycle: componentWillMount`);
		this.setState({ isMounted: false });
	},
	componentWillUnmount: function() {
		Logger.debug(tag`LifeCycle: componentWillUnmount`);
		this.setState({ isMounted: false });
	},
	componentDidMount: function() {
		Logger.debug(tag`LifeCycle: componentDidMount`);
		this.setState({ isMounted: true });
	},
	componentWillReceiveProps: function(nextProps) {
		Logger.debug(tag`LifeCycle: componentWillReceiveProps => nextProps = ${nextProps}`);
	},
	shouldComponentUpdate: function(nextProps, nextState) {
		Logger.debug(tag`LifeCycle: shouldComponentUpdate => nextProps = ${nextProps}, nextState = ${nextState}`);
		return true;
	},
	componentWillUpdate: function(nextProps, nextState) {
		Logger.debug(tag`LifeCycle: componentWillUpdate => nextProps = ${nextProps}, nextState = ${nextState}`);
	},
	componentDidUpdate: function(prevProps, prevState) {
		Logger.debug(tag`LifeCycle: componentDidUpdate => prevProps = ${prevProps}, prevState = ${prevState}`);
	}
};

export default LifeCycle;