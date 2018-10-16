'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
//import PropTypes from 'prop-types';

type Props = {};

export default class Block extends Component<Props> {
  displayName: string = 'Block';

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
