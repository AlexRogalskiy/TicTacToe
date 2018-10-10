'use strict';

/**
 * Module dependencies
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Block extends Component {
  get displayName() {
    return 'Block';
  }
  
  static get propTypes() {
    return {
      content: PropTypes.string
    };
  }

  static get defaultProps() {
    return {
      className: 'content',
      content: ''
    };
  }

  render() {
    const { className, content, ...rest } = this.props;
    return (
		<span className={className} {...rest}>{content}</span>
    );
  }
}

export default Block;
