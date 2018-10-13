'use strict';

/**
 * Module dependencies
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { style, classes } from 'typestyle';

export default class Loader extends Component {
  get displayName() {
    return 'Loader';
  }

  static get propTypes() {
    return {
      dataClass: PropTypes.object,
      inline: PropTypes.bool,
    };
  }

  static get defaultProps() {
    return {
      className: 'loader',
      dataClass: {
        containerClass: 'loader-container',
        nestedContainerClass: 'inline',
      },
      inline: false,
    };
  }

  render() {
    const { className, dataClass, inline, ...rest } = this.props;
    const containerClassName = classes(
      dataClass.containerClass,
      inline && dataClass.nestedContainerClass
    );
    return (
      <div className={className}>
        <div className={containerClassName} {...rest}>
          <aside />
          <aside />
          <aside />
          <aside />
          <aside />
        </div>
      </div>
    );
  }
};
