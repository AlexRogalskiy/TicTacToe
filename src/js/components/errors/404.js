'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
//import PropTypes from 'prop-types';
import { style, classes } from 'typestyle';

type Props = {
	 message?: string
};

export default class ResourceNotFoundError extends Component<Props> {
  displayName: string = 'ResourceNotFoundError';

  static defaultProps: Props = {
      className: 'error-not-found',
	  message: '404 [ Resource not found ]'
  };

  render(): Node {
    const { messsage, ...rest } = this.props;
    return (<div {...rest}>{ message }</div>);
  }
};