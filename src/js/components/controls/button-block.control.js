'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';

type Props = {
	onClick?: func
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
      <div ref={element => (this.element = element)} onClick={this.onClick(this.props.name)} {...rest}>
        {label}
      </div>
    );
  }
};