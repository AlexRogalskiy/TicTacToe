'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';

type Props = {
	children?: React.Node
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
