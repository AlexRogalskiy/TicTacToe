'use strict';

/**
 * Module dependencies
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class InternalServerError extends Component {
  get displayName() {
    return 'InternalServerError';
  }

  static get propTypes() {
    return {
      message: PropTypes.string,
    };
  }

  static get defaultProps() {
    return {
      message: '503 [ Internal server error ]',
    };
  }

  render() {
    const { messsage, ...rest } = this.props;
    return <div {...rest}>{message}</div>;
  }
}

export default InternalServerError;
