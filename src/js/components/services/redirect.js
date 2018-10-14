'use strict';

/**
 * Module dependencies
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Redirect extends Component {
  get displayName() {
    return 'Redirect';
  }

  static get propTypes() {
    return {
      path: PropTypes.string
    };
  }

  static get defaultProps() {
    return {
      path: './'
    };
  }

  render() {
    return <Redirect to={`/${this.props.path}/${this.props.match.params}`} />;
  }
};
