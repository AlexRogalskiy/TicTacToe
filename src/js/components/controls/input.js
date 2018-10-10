'use strict';

/**
 * Module dependencies
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { style, classes } from 'typestyle';

class Input extends Component {
  get displayName() {
    return 'Input';
  }
  
  static get propTypes() {
    return {
	  dataClass: PropTypes.object,
      isDisabled: PropTypes.bool
    };
  }

  static get defaultProps() {
    return {
      className: 'input',
	  dataClass: {
        inputClass: 'input'
      },
	  isDisabled: false
    };
  }

  render() {
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
              this.textInput = input;
            }} 
			disabled={isDisabled}
            {...rest}
          />
          {children}
      </div>
    );
  }
}

export default Input;
