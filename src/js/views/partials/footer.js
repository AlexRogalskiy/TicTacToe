'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';

export default class Footer extends Component {
  get displayName(): string {
    return 'Footer';
  }

  static get defaultProps(): object {
    return {
      className: 'footer',
    };
  }

  render(): Node {
    const { children, ...rest } = this.props;
    return <footer {...rest}>{children}</footer>;
  }
};
