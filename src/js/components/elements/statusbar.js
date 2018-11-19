'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';

type Props = {
	message: string,
	children?: React.Node
};

export default class StatusBar extends Component<Props> {
  displayName: string = 'StatusBar';
  
  static defaultProps: Props = {
	className: 'statusbar',
	message: null
  };

  render(): Node {
    const { message, className, children, ...rest } = this.props;
    const messages = message ? <div>{ message }</div> : null;
    const childs = children ? <div>{ children }</div> : null;
    return (
      <div className={className} {...rest}>
        {messages}
        {childs}
      </div>
    );
  }
};
