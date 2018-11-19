'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
//import PropTypes from 'prop-types';

type Props = {
	message?: string
};

export default class IconElement extends Component<Props> {
  displayName: string = 'IconElement';
  
  static defaultProps: Props = {
      className: 'icon',
      message: null
  };

  render(): Node {
    const { className, message, ...rest } = this.props;
    return (
		<span className={className} aria-hidden='true'>{ message }</span>
    );
  }
};