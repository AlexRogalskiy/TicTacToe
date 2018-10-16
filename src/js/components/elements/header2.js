'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
//import PropTypes from 'prop-types';

type Props = {
	message?: string
};

export default class Header2 extends Component<Props> {
  displayName: string = 'Header2';

  static defaultProps: Props = {
      className: 'header2',
      message: ''
  };

  render(): Node {
    const { className, message, ...rest } = this.props;
    return (
      <h2 className={className} {...rest}>{message}</h2>
    );
  }
};
