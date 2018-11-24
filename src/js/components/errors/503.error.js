'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
//import PropTypes from 'prop-types';
import { style, classes } from 'typestyle';
import { Elements } from 'libs/elements.lib';

/* @flow */
type Props = {
	 message?: string;
	 children?: Node;
};

export default class InternalServerError extends Component<Props> {
  displayName: string = 'InternalServerError';
  
  static defaultProps: Props = {
      className: 'error-internal',
	   message: '503 [ Internal server error ]'
  };
  
  render(): Node {
    const { messsage, ...rest } = this.props;
    return (<Elements.View {...rest}>{ message }</Elements.View>);
  }
};