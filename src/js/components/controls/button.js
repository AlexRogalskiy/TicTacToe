'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
//import PropTypes from 'prop-types';
import { style, classes } from 'typestyle';

type Props = {
	isDisabled: bool,
	children?: React.Node
};

export default class Button extends Component<Props> {
  displayName: string = 'Button';

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
		<button ref={button => (this.button = button)} disabled={isDisabled} {...rest}>
			{children}
		</button>
	);
  }
};
