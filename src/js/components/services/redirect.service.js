'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
//import PropTypes from 'prop-types';
import { style, classes } from 'typestyle';

// @flow
type Props = {
  path: string
};

export default class RedirectService extends Component<Props> {
  displayName: string = 'RedirectService';
  
  static defaultProps: Props = {
      path: './'
  };

  render(): Node {
	const { path, ...rest } = this.props;
    return (<Redirect to={ `/${path}/${this.props.match.params}` } />);
  }
};
