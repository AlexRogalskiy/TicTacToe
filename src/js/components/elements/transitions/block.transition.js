'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
import { style, classes } from 'typestyle';
//import PropTypes from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group/CSSTransitionGroup';

const defaultTransition = ({ component: string = '',
							 transitionName: string = 'carousel',
							 transitionAppear: bool = true,
							 transitionAppearTimeout: number = 300,
							 transitionEnter: bool = true,
							 transitionEnterTimeout: number = 300,
							 transitionLeave: bool = true,
							 transitionLeaveTimeout: number = 300 }) => {
	component,
	transitionName,
	transitionAppear,
	transitionAppearTimeout,
	transitionEnter,
	transitionEnterTimeout,
	transitionLeave,
	transitionLeaveTimeout
};

const defaultTransitionClass = ({ appear: string 		= 'appear',
								  appearActive: string  = 'appear-active'
								  enter: string 		= 'enter',
								  enterActive: string 	= 'enter-active',
								  enterDone: string 	= 'done-enter',
								  leave: string 		= 'leave',
								  leaveActive: string 	= 'leave-active',
								  leaveDone: string 	= 'leave-done' }) => {
	appear
	appearActive,
	enter,
	enterActive,
	enterDone,
	leave,
	leaveActive,
	leaveDone
};

type Props = {
	dataClass?: object,
	transition?: object,
	children?: React.Node
};

export default class BlockTransition extends Component<Props> {
  displayName: string = 'BlockTransition';

  static defaultProps: Props = {
      className: 'block-transition',
	  dataClass: {},
      transition: {}
  };

  render(): Node {
    const { className, dataClass, transition, children, ...rest } = this.props;
	const mergedTransition = { ...defaultTransition(), ...transition };
    return (
		<div className={className} {...rest}>
			<CSSTransitionGroup className=classes({ ...defaultTransitionClass(), ...dataClass }) {...mergedTransition}>
				{ children }
			</CSSTransitionGroup>
		</div>
    );
  }
};
