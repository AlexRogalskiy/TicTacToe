'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
import PropTypes from 'prop-types';
import { style, classes } from 'typestyle';

import { Elements } from 'libs/elements.lib';

/* @flow */
type Props = {
	dataClass?: Object<any>;
	isDisabled?: boolean;
	children?: Node;
};
type State = {
	isDisabled?: boolean;
};

export default class InputControl extends Component<Props, State> {
  displayName = 'InputControl';
  
  input: ?HTMLInputElement;

  state: State = {
	  isDisabled: this.props.isDisabled
  };
  
  static defaultProps: Props = {
      className: 'input',
	  dataClass: {
        inputClass: 'input'
      },
	  isDisabled: false
  };

  constructor(props: Props): void {
    super(props);
    //this.state = { isDisabled: props.isDisabled };
  }
  
  render(): Node {
    const {
      className,
	  isDisabled,
      children,
      dataClass,
      ...rest
    } = this.props;
    rest.className = dataClass.inputClass;
    return (
      <Elements.View className={className}>
          <Elements.Control
            ref={input => {
              this.input = input;
            }} 
			disabled={this.state.isDisabled}
            {...rest}
          />
          {children}
      </Elements.View>
    );
  }
};
