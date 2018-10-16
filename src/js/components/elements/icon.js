'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
//import PropTypes from 'prop-types';

type Props = {
	message?: string
};

export default class Icon extends Component<Props> {
  displayName: string = 'Icon';
  
  static defaultProps: Props = {
      className: 'icon',
      message: ''
  };

  render(): Node {
    const { className, message, ...rest } = this.props;
    return (
		<span className={className} aria-hidden='true'>{message}</span>
    );
  }
};