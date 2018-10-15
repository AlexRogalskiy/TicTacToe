'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';

type Props = {};

export default class ButtonBlock extends Component<Props> {
  displayName: string = 'ButtonBlock';
  
  element: ?HTMLElement;

  static defaultProps: Props = {
	className: 'button'
 };
  
  constructor(props: Props): void {
    super(props);
    this.onClick = this.onClick.bind(this);
  }
  
  getValidatorData(): object {
    return this.state;
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