'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
//import PropTypes from 'prop-types';

import { Elements } from 'libs/elements.lib';

// @flow
type Props = {
	message?: string;
};

export default class IconElement extends Component<Props> {
  displayName: string = 'IconElement';
  
  static defaultProps: Props = {
      className: 'icon',
      message: null
  };

  render(): Node {
    const { className, message, ...rest } = this.props;
    return (
		<Elements.Text className={className} aria-hidden='true'>{ message }</Elements.Text>
    );
  }
};