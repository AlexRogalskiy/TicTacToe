'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';

// @flow
type Props = {
	message: string,
	children?: Node
};

export default class StatusBarElement extends Component<Props> {
  displayName: string = 'StatusBarElement';
  
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
        { messages }
        { childs }
      </div>
    );
  }
};
