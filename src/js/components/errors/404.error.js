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

export default class ResourceNotFoundError extends Component<Props> {
  displayName: string = 'ResourceNotFoundError';

  static defaultProps: Props = {
      className: 'error-not-found',
	  message: '404 [ Resource not found ]'
  };

  render(): Node {
    const { messsage, ...rest } = this.props;
    return (<Elements.View {...rest}>{ message }</Elements.View>);
  }
};