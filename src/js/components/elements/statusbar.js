'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';

type Props = {
	message: string
};

export default class StatusBar extends Component<Props> {
  displayName: string = 'StatusBar';
  
  static defaultProps: Props = {
	className: 'statusbar',
	message: null
  };

  render(): Node {
    const { message, className, children, ...rest } = this.props;
    const messages = message ? <div>{message}</div> : '';
    const childs = children ? <div>{children}</div> : '';
    return (
      <div className={className} {...rest}>
        {messages}
        {childs}
      </div>
    );
  }
};
