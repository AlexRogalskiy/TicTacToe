'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
//import PropTypes from 'prop-types';
import { style, classes } from 'typestyle';

import { Elements } from 'libs/elements.lib';

/* @flow */
type Props = {
	isDisabled: boolean,;
	children?: Node;
};

export default class BasicButtonControl extends Component<Props> {
  displayName: string = 'BasicButtonControl';

  button: ?HTMLButtonElement;
	
  static defaultProps: Props = {
      className: 'button',
	  isDisabled: false
  };

  render(): Node {
    const {
	  isDisabled,
      children,
      ...rest
    } = this.props;
	return (
		<Elements.Button ref={button => (this.button = button)} disabled={isDisabled} {...rest}>
			{children}
		</Elements.Button>
	);
  }
};
