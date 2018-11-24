'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
import PropTypes from 'prop-types';
import { style, classes } from 'typestyle';

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
	  isDisabled: false
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
    this.state = { isDisabled: props.isDisabled };
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
      <div className={className}>
          <input
            ref={input => {
              this.input = input;
            }} 
			disabled={this.state.isDisabled}
            {...rest}
          />
          {children}
      </div>
    );
  }
};
