'use strict';

/**
 * Module dependencies
 */
import React, { Component } from 'react';

import { Logger } from '../libs/logger';
import { isFunction } from '../libs/helpers';

export default function wrapper(WrappedComponent) {
  return class extends Component {
    get displayName() {
      return 'TransitionWrapper';
    }

    constructor(props) {
      super(props);
      this.state = { isMounted: false, isActivated: false };
    }

    componentWillAppear(callback) {
      Logger.debug('componentWillAppear');
      this.setState({ isMounted: false, isActivated: false });
      if (isFunction(callback)) {
        callback();
      }
    }

    componentDidAppear(callback) {
      Logger.debug('componentDidAppear');
      this.setState({ isMounted: true, isActivated: false });
      if (isFunction(callback)) {
        callback();
      }
    }

    componentWillEnter(callback) {
      Logger.debug('componentWillEnter');
      this.setState({ isMounted: true, isActivated: false });
      if (isFunction(callback)) {
        callback();
      }
    }

    componentDidEnter(callback) {
      Logger.debug('componentDidEnter');
      this.setState({ isMounted: true, isActivated: true });
      if (isFunction(callback)) {
        callback();
      }
    }

    componentWillLeave(callback) {
      Logger.debug('componentWillLeave');
      this.setState({ isMounted: true, isActivated: false });
      if (isFunction(callback)) {
        callback();
      }
    }

    componentDidLeave(callback) {
      Logger.debug('componentDidLeave');
      this.setState({ isMounted: true, isActivated: false });
      if (isFunction(callback)) {
        callback();
      }
    }

    render() {
      return (
        <WrappedComponent
          isMounted={this.state.isMounted}
          isActivated={this.state.isActivated}
          {...this.props}
        />
      );
    }
  };
}
