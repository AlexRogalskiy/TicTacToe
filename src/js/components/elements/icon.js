'use strict';

/**
 * Module dependencies
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Icon extends Component {
  get displayName() {
    return 'Icon';
  }
  
  static get propTypes() {
    return {
      message: PropTypes.string
    };
  }

  static get defaultProps() {
    return {
      className: 'icon',
      message: '',
    };
  }

  render() {
    const { className, message, ...rest } = this.props;
    return (
		<span className={className} aria-hidden='true'></span>
    );
  }
};