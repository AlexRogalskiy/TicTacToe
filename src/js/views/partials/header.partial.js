'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
import { Elements } from 'libs/elements.lib';

/* @flow */
type Props = {
	children?: Node;
};

export default class HeaderPartial extends Component<Props> {
  displayName: string = 'HeaderPartial';
  
  static defaultProps: Props = {
	  className: 'header'
  };

  render(): Node {
    const { children, ...rest } = this.props;
    return <Elements.Header {...rest}>{ children }</Elements.Header>;
  }
};