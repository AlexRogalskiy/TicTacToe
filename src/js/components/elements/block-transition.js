'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
import { style, classes } from 'typestyle';
//import PropTypes from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group/CSSTransitionGroup';

const defaultTransition = (transitionName: string = 'carousel') => {
	transitionName,
	transitionEnterTimeout: 300,
	transitionLeaveTimeout: 300
};

/*classNames={{
 appear: 'my-appear',
 appearActive: 'my-active-appear',
 enter: 'my-enter',
 enterActive: 'my-active-enter',
 enterDone: 'my-done-enter,
 exit: 'my-exit',
 exitActive: 'my-active-exit',
 exitDone: 'my-done-exit,
}}*/

type Props = {
	transition?: object
};

export default class BlockTransition extends Component<Props> {
  displayName: string = 'BlockTransition';

  static defaultProps: Props = {
      className: 'block-transition',
      transition: {}
  };

  render(): Node {
    const { className, transition, children, ...rest } = this.props;
	const mergedTransition = { ...defaultTransition(), ...transition };
    return (
		<div className={className} {...rest}>
			<CSSTransitionGroup {...mergedTransition}>
				{children}
			</CSSTransitionGroup>
		</div>
    );
  }
};
