'use strict';

/**
 * Module dependencies
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { style, classes } from 'typestyle';

export default class Button extends Component {
  get displayName() {
    return 'Button';
  }
  
  static get propTypes() {
    return {
      isDisabled: PropTypes.bool
    };
  }

  static get defaultProps() {
    return {
      className: 'button',
	  isDisabled: false
    };
  }

  render() {
    const {
	  isDisabled,
      children,
      ...rest
    } = this.props;
	return (
		<button disabled={isDisabled} {...rest}>
			{children}
		</button>
	);
  }
};
