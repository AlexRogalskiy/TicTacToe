'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
import { style, classes } from 'typestyle';

import { Elements } from 'libs/elements.lib';

/* @flow */
type Props = {
    message?: string;
	dataClass?: Object<any>;
    date?: Object<date>;
};
type State = {
	date: Object<date>;
};

export default class ClockElement extends Component<Props, State> {
  displayName: string = 'ClockElement';
  
  state: State = {
	date: null  
  };

  static defaultProps: Props = {
	className: 'clock',
	dataClass: { clockMessageClass: 'clock-message', clockDateClass: 'clock-date' },
    message: null
  };
  
  constructor(props: Props): void {
	super(props);
	this.state = { date: props.date ? props.date : Date.now() };
  }
  
  componentDidMount(): void {
    this.timerId = setInterval(() => this.tick(), 1000);
  }
  
  componentWillUnmount(): void {
    clearInterval(this.timerId);
  }
  
  tick(): void {
    this.setState({
      date: Date.now()
    });
  }
  
  render(): Node {
    const { className, dataClass, date, message, ...rest } = this.props;
    return (
      <Elements.View className={className} {...rest}>
        <Elements.Text className={dataClass.clockMessageClass}>{message}</Elements.Text>
        <Elements.Text className={dataClass.clockDateClass}>{this.state.date.toLocaleTimeString()}</Elements.Text>
      </div>
    );
  }
};
