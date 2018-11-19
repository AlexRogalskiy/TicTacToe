'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
import PropTypes from 'prop-types';
import { style, classes } from 'typestyle';

type Props = {
	dataClass?: object,
	isDisabled?: bool,
	children?: React.Node
};

export default class InputControl extends Component<Props> {
  displayName = 'InputControl';
  
  input: ?HTMLInputElement;

  static defaultProps: Props = {
      className: 'input',
	  dataClass: {
        inputClass: 'input'
      },
	  isDisabled: false
  };

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
			disabled={isDisabled}
            {...rest}
          />
          {children}
      </div>
    );
  }
};