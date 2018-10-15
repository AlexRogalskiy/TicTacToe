'use strict';

/**
 * Module dependencies
 */
import Logger from 'app-root/libs/logger';

export default class LifeCycle {
	
  componentWillMount(): void {
    Logger.debug(`LifeCycle: componentWillMount`);
    this.setState({ isMounted: false });
  }
  
  componentWillUnmount(): void {
    Logger.debug(`LifeCycle: componentWillUnmount`);
    this.setState({ isMounted: false });
  }

  componentDidMount(): void {
    Logger.debug(`LifeCycle: componentDidMount`);
    this.setState({ isMounted: true });
  }

  componentWillReceiveProps(nextProps: object): void {
    Logger.debug(
      `LifeCycle: componentWillReceiveProps => nextProps = ${nextProps}`
    );
  }

  shouldComponentUpdate(nextProps: object, nextState: object): void {
    Logger.debug(
      `LifeCycle: shouldComponentUpdate => nextProps = ${nextProps}, nextState = ${nextState}`
    );
    return true;
  }

  componentWillUpdate(nextProps: object, nextState: object): void {
    Logger.debug(
      `LifeCycle: componentWillUpdate => nextProps = ${nextProps}, nextState = ${nextState}`
    );
  }

  componentDidUpdate(prevProps: object, prevState: object): void {
    Logger.debug(
      `LifeCycle: componentDidUpdate => prevProps = ${prevProps}, prevState = ${prevState}`
    );
  }
};
