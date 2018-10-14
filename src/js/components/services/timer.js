'use strict';

/**
 * Module dependencies
 */
import React, { Component } from 'react';
import Bacon from 'bacon';
import PropTypes from 'prop-types';

const time = Bacon.fromBinder(observer => {
  const timer = setTimeout(() => {
    observer(Date.now());
  }, 1000);
  return () => {
    clearTimeout(timer);
  };
});

export default class Timer extends Component {
  get displayName() {
    return 'Timer';
  }
  
  constructor(props) {
    super(props);
    this.state = { time: 0 };
  }
  
  componentDidMount() {
    this._unsubscribe = time.onValue(time => this.setState({ time: time }));
  }
  
  componentWillUnmount() {
    this._unsubscribe();
  }
  
  render() {
    return (
      <div>Current Time: {this.state.time}</div>
    );
  }
};