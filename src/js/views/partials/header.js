'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';

export default class Header extends Component {
  get displayName(): string {
    return 'Header';
  }

  static get defaultProps(): object {
    return {
      className: 'header',
    };
  }

  render(): Node {
    const { children, ...rest } = this.props;
    return <header {...rest}>{children}</header>;
  }
};