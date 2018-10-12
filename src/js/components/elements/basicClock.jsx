"use strict";
/**
 * Module dependencies
 */
import React from 'react';

let Types = React.PropTypes;

export default class Clock extends React.Component {
  displayName: 'Clock'
  static propTypes: {
    message: Types.string,
    date: Types.object,
    item: Types.object
  }
  static defaultProps = {
    message: '',
    date: new Date(),
    item: {}
  }
  constructor(props) {
    super(props);
    this.state = {
      message: props.message,
      date: props.date,
      item: props.item
    };
  }
  componentDidMount() {
    this.timerId = setInterval(
      ()=> this.tick(),
      1000
    );
  }  
  componentWillUnmount() {
    clearInterval(this.timerId);
  }  
  tick() {
    this.setState({
      date: new Date()
    });
  }  
  render() {
    const { message, ...rest } = this.props;
    return (
      <div {...rest}>
        <span>{message}</span>
        <span>{this.state.date.toLocaleTimeString()}</span>
      </div>
    );
  }
}