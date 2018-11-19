'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';

type Props = {
	children?: React.Node
};

export default class HeaderPartial extends Component<Props> {
  displayName: string = 'HeaderPartial';
  
  static defaultProps: Props = {
	  className: 'header'
  };

  render(): Node {
    const { children, ...rest } = this.props;
    return <header {...rest}>{ children }</header>;
  }
};