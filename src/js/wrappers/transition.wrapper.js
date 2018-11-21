'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';

import Logger from 'app-root/libs/logger.lib';
import { isFunction } from 'app-root/libs/helpers.lib';

// @flow
type State = {
	isMounted: boolean,
	isActivated: boolean
};

export default function TransitionWrapper<Props: {}>(WrappedComponent: React.ComponentType<Props>)Ж React.ComponentType<Props> {
	
  return class extends Component<{}, State> {
	displayName: string = 'TransitionWrapper';
	
	state: State = {
		isMounted: false,
		isActivated: false
	};

    componentWillAppear(callback: func): void {
      Logger.debug('componentWillAppear');
      this.setState({ isMounted: false, isActivated: false });
      if (isFunction(callback)) {
        callback();
      }
    }

    componentDidAppear(callback: func): void {
      Logger.debug('componentDidAppear');
      this.setState({ isMounted: true, isActivated: false });
      if (isFunction(callback)) {
        callback();
      }
    }

    componentWillEnter(callback: func): void {
      Logger.debug('componentWillEnter');
      this.setState({ isMounted: true, isActivated: false });
      if (isFunction(callback)) {
        callback();
      }
    }

    componentDidEnter(callback: func): void {
      Logger.debug('componentDidEnter');
      this.setState({ isMounted: true, isActivated: true });
      if (isFunction(callback)) {
        callback();
      }
    }

    componentWillLeave(callback: func): void {
      Logger.debug('componentWillLeave');
      this.setState({ isMounted: true, isActivated: false });
      if (isFunction(callback)) {
        callback();
      }
    }

    componentDidLeave(callback: func): void {
      Logger.debug('componentDidLeave');
      this.setState({ isMounted: true, isActivated: false });
      if (isFunction(callback)) {
        callback();
      }
    }

    render(): Node {
      return (
        <WrappedComponent
          isMounted={this.state.isMounted}
          isActivated={this.state.isActivated}
          {...this.props}
        />
      );
    }
  };
};
