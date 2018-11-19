'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
import { style, classes } from 'typestyle';

type Props = {
    message?: string,
	dataClass?: object,
    date?: object,
};
type State = {
	date: date
};

export default class ClockElement extends Component<Props, State> {
  displayName: string = 'ClockElement';
  
  state: State = {
	date: null  
  };

  static defaultProps: Props = {
	className: 'clock',
	dataClass: { clockMessageClass: 'clock-message', clockDateClass: 'clock-date' },
    message: ''
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
    const { className, dataClass, message, ...rest } = this.props;
    return (
      <div className={className} {...rest}>
        <span className={dataClass.clockMessageClass}>{message}</span>
        <span className={dataClass.clockDateClass}>{this.state.date.toLocaleTimeString()}</span>
      </div>
    );
  }
};
