'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
//import PropTypes from 'prop-types';

/* @flow */
type Props = {
	children?: Node;
};

export default class BlockElement extends Component<Props> {
  displayName: string = 'BlockElement';

  static defaultProps: Props =  {
      className: 'block'
  };

  render(): Node {
    const { className, children, ...rest } = this.props;
    return (
		<span className={className} {...rest}>{children}</span>
    );
  }
};
