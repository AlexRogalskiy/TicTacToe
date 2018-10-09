'use strict';

/**
 * Module dependencies
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class BasicHeader2 extends Component {
  get displayName() {
    return 'BasicHeader2';
  }
  
  static get propTypes() {
    return {
      message: PropTypes.string
    };
  }

  static get defaultProps() {
    return {
      className: 'basic-header2',
      message: '',
    };
  }

  constructor(props) {
    super(props);
  }

  render() {
    const { className, message, ...rest } = this.props;
    return (
      <h2 className={className} {...rest}>{message}</h2>
    );
  }
}

export default BasicHeader2;
