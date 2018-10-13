'use strict';

/**
 * Module dependencies
 */
import React, { Component } from 'react';

export default class Footer extends Component {
  get displayName() {
    return 'Footer';
  }

  static get defaultProps() {
    return {
      className: 'footer',
    };
  }

  render() {
    const { children, ...rest } = this.props;
    return <footer {...rest}>{children}</footer>;
  }
};
