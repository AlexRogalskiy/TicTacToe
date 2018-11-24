'use strict';

/**
 * Module dependencies
 */
import Logger from 'libs/logger.lib';

/* @flow */
type State = {
	isMounted: boolean
};

export default class LifeCycleMixin<{}, State> {
  displayName: string = 'LifeCycleMixin';
  
  state: State = {
	  isMounted: false
  };
  
  componentWillMount(): void {
    Logger.debug(`LifeCycleMixin: componentWillMount`);
    this.setState({ isMounted: false });
  }
  
  componentWillUnmount(): void {
    Logger.debug(`LifeCycleMixin: componentWillUnmount`);
    this.setState({ isMounted: false });
  }

  componentDidMount(): void {
    Logger.debug(`LifeCycleMixin: componentDidMount`);
    this.setState({ isMounted: true });
  }

  componentWillReceiveProps(nextProps: Object<any>): void {
    Logger.debug(
      `LifeCycleMixin: componentWillReceiveProps => nextProps = ${nextProps}`
    );
  }

  shouldComponentUpdate(nextProps: Object<any>, nextState: Object<any>): void {
    Logger.debug(
      `LifeCycleMixin: shouldComponentUpdate => nextProps = ${nextProps}, nextState = ${nextState}`
    );
    return true;
  }

  componentWillUpdate(nextProps: Object<any>, nextState: Object<any>): void {
    Logger.debug(
      `LifeCycleMixin: componentWillUpdate => nextProps = ${nextProps}, nextState = ${nextState}`
    );
  }

  componentDidUpdate(prevProps: Object<any>, prevState: Object<any>): void {
    Logger.debug(
      `LifeCycleMixin: componentDidUpdate => prevProps = ${prevProps}, prevState = ${prevState}`
    );
  }
};
