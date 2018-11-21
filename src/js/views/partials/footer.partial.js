'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';

// @flow
type Props = {
	children?: Node
};

export default class FooterPartial extends Component<Props> {
  displayName: string = 'FooterPartial';

  static defaultProps: Props = {
	  className: 'footer'
  };

  render(): Node {
    const { children, ...rest } = this.props;
    return <footer {...rest}>{ children }</footer>;
  }
};
