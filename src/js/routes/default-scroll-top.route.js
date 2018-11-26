'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
//import PropTypes from 'prop-types';

/* @flow */
type Props = {
	children?: Node;
};

export default class DefaultScrollTopRoute extends Component<Props> {
  displayName: string = 'DefaultScrollTopRoute';

  componentDidMount(): void {
    window.scrollTo(0, 0);
  }
  
  render(): Node {
    return null;
  }
};

/*class LongContent extends Component {
  render() {
    <div>
      <ScrollToTopOnMount />
      <h1>Here is my long content page</h1>
    </div>;
  }
}
<Route path="/long-content" component={LongContent} />;*/