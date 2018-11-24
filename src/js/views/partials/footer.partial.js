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

export default class FooterPartial extends Component<Props> {
  displayName: string = 'FooterPartial';

  static defaultProps: Props = {
	  className: 'footer'
  };

  render(): Node {
    const { children, ...rest } = this.props;
    return <Elements.Footer {...rest}>{ children }</Elements.Footer>;
  }
};
