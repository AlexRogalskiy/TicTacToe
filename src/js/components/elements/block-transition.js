'use strict';

/**
 * Module dependencies
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group/CSSTransitionGroup';

const defaultTransition = (transitionName = 'carousel') => {
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

export default class BlockTransition extends Component {
  get displayName() {
    return 'BlockTransition';
  }
  
  static get propTypes() {
    return {
      transition: PropTypes.object
    };
  }

  static get defaultProps() {
    return {
      className: 'block-transition',
      transition: {}
    };
  }

  render() {
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
