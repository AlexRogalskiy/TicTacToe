'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
//import PropTypes from 'prop-types';
import { Elements } from 'libs/elements.lib';

/* @flow */
type Props = {
	message?: string;
};

export default class Head2Element extends Component<Props> {
  displayName: string = 'Head2Element';

  static defaultProps: Props = {
      className: 'header2',
      message: null
  };

  render(): Node {
    const { className, message, ...rest } = this.props;
    return (
      <Elements.Head_2 className={className} {...rest}>{ message }</Elements.Head_2>
    );
  }
};
