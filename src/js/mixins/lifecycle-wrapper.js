"use strict";

/**
 * Module dependencies
 */
import { createReactClass } from 'create-react-class';

import { Logger } from '../libs/logger';

export default function wrapper(WrappedComponent) {
  	return createReactClass({
			displayName: "LifeCycleWrapper"
			
			constructor(props) {
				super(props);
				this.state = { isMounted: false };
			}
			
			componentWillMount() {
				Logger.debug(`LifeCycle: componentWillMount`);
				this.setState({ isMounted: false });
			}
			
			componentWillUnmount() {
				Logger.debug(`LifeCycle: componentWillUnmount`);
				this.setState({ isMounted: false });
			}
			
			componentDidMount() {
				Logger.debug(`LifeCycle: componentDidMount`);
				this.setState({ isMounted: true });
			}
			
			componentWillReceiveProps(nextProps) {
				Logger.debug(`LifeCycle: componentWillReceiveProps => nextProps = ${nextProps}`);
			}
			
			shouldComponentUpdate(nextProps, nextState) {
				Logger.debug(`LifeCycle: shouldComponentUpdate => nextProps = ${nextProps}, nextState = ${nextState}`);
				return true;
			}
			
			componentWillUpdate(nextProps, nextState) {
				Logger.debug(`LifeCycle: componentWillUpdate => nextProps = ${nextProps}, nextState = ${nextState}`);
			}
			
			componentDidUpdate(prevProps, prevState) {
				Logger.debug(`LifeCycle: componentDidUpdate => prevProps = ${prevProps}, prevState = ${prevState}`);
			}
			
			render() {
				return (
					<WrappedComponent isMounted={this.state.isMounted} {...this.props} />
				);
			}
  	});
};