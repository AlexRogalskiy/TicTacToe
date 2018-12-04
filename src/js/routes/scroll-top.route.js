'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
import { withRouter } from 'react-router';
//import PropTypes from 'prop-types';

/* @flow */
type Props = {
	location: Object<any>;
	children?: Node;
};

class ScrollTopRoute extends Component<Props> {
  displayName: string = 'ScrollTopRoute';

  componentDidUpdate(prevProps: Object<any>): void {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }
  
  render(): Node {
    return this.props.children;
  }
};

export default withRouter(ScrollTopRoute);