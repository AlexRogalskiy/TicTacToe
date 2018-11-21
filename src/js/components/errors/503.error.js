'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
//import PropTypes from 'prop-types';
import { style, classes } from 'typestyle';

// @flow
type Props = {
	 message?: string
};

export default class InternalServerError extends Component<Props> {
  displayName: string = 'InternalServerError';
  
  static defaultProps: Props = {
      className: 'error-internal',
	   message: '503 [ Internal server error ]'
  };
  
  render(): Node {
    const { messsage, ...rest } = this.props;
    return (<div {...rest}>{ message }</div>);
  }
};