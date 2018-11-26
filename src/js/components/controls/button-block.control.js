'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';

import { Elements } from 'libs/elements.lib';

/* @flow */
type Props = {
	onClick?: func;
	children?: Node;
};

export default class ButtonBlockControl extends Component<Props> {
  displayName: string = 'ButtonBlockControl';
  
  element: ?HTMLElement;

  static defaultProps: Props = {
	className: 'button'
 };
  
  constructor(props: Props): void {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick(field: string): func {
    return (event: SyntheticEvent<HTMLElement>) => {
	  this.setState({ field: event.currentTarget.src });
      if (this.props.onClick) {
        this.props.onClick(event);
      }
    };
  }

  render(): Node {
    const { label, onClick, ...rest } = this.props;
    return (
      <Elements.View ref={element => (this.element = element)} onClick={this.onClick(this.props.name)} {...rest}>
        {label}
      </Elements.View>
    );
  }
};