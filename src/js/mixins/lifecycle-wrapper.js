'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';

import Logger from 'app-root/libs/logger';

type Props = {};
type State = {
	isMounted: bool
};

export default function wrapper<Props: {}>(WrappedComponent: React.ComponentType<Props>): React.ComponentType<Props> {
	
  return class extends Component<Props, State> {
	displayName: string = 'LifeCycleWrapper';
		
	state: State = {
		isMounted: false
	};

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

    render(): Node {
      return (
        <WrappedComponent
			isMounted={this.state.isMounted}
			{...this.props}
		/>
      );
    }
  };
};
