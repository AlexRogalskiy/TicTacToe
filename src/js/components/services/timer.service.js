'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
//import PropTypes from 'prop-types';
import { style, classes } from 'typestyle';
import Bacon from 'bacon';

const time = Bacon.fromBinder(observer => {
  const timer = setTimeout(() => {
    observer(Date.now());
  }, 1000);
  return () => {
    clearTimeout(timer);
  };
});

type Props = {
	message?: string
};
type State = {
	time: number
};

export default class TimerService extends Component<Props, State> {
  displayName: string = 'TimerService';

  state: State = {
	  time: 0
  };
  
  static defaultProps: Props = {
	  className: 'timer',
      message: 'Current Time:'
  };
  
  componentDidMount(): void {
      this._unsubscribe = time.onValue(time => this.setState({ time: time }));
  }
  
  componentWillUnmount(): void {
      this._unsubscribe();
  }
  
  render(): Node {
	  const {className, ...rest} = this.props;
      return (
          <div className={className} {...rest}>{message} {this.state.time}</div>
      );
  }
};