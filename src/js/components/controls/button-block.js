'use strict';

/**
 * Module dependencies
 */
import React, { Component } from 'react';

export default class ButtonBlock extends Component {
  get displayName() {
    return 'ButtonBlock';
  }

  static get defaultProps() {
    return {
      className: 'button',
    };
  }
  
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }
  
  getValidatorData() {
    return this.state;
  }

  onClick(field) {
    return event => {
	  this.setState({ event: event.target.src });
      if (this.props.onClick) {
        this.props.onClick(event);
      }
    };
  }

  render() {
    const { label, onClick, ...rest } = this.props;
    return (
      <div onClick={this.onClick(this.props.name)} {...rest}>
        {label}
      </div>
    );
  }
};