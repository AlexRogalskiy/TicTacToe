'use strict';

/**
 * Module dependencies
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ResourceNotFoundError extends Component {
  get displayName() {
    return 'ResourceNotFoundError';
  }

  static get propTypes() {
    return {
      message: PropTypes.string,
    };
  }

  static get defaultProps() {
    return {
      message: '404 [ Resource not found ]',
    };
  }

  render() {
    const { messsage, ...rest } = this.props;
    return <div {...rest}>{message}</div>;
  }
};