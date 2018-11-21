'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
//import PropTypes from 'prop-types';

// @flow
type Props = {
	message?: string
};

export default class Header2Element extends Component<Props> {
  displayName: string = 'Header2Element';

  static defaultProps: Props = {
      className: 'header2',
      message: null
  };

  render(): Node {
    const { className, message, ...rest } = this.props;
    return (
      <h2 className={className} {...rest}>{ message }</h2>
    );
  }
};
