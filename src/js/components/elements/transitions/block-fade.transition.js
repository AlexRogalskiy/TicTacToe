'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
//import PropTypes from 'prop-types';
import { style, classes } from 'typestyle';
import { Transition } from 'react-transition-group';

const defaultStyle = (duration: number = 300) => {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0
};

const defaultTransitionStyle = {
  entering: { opacity: 0 },
  entered:  { opacity: 1 }
};

const defaultTransition = (transitionIn: bool = false, timeout: object = { enter: 300, exit: 500 }) => {
	in: transitionIn,
	timeout: timeout
};

type Props = {
	transition?: object,
	children?: React.Node
};

export default class BlockFadeTransition extends Component<Props> {
  displayName: string = 'BlockFadeTransition';

  static defaultProps: Prosp = {
      className: 'block-fade-transition',
	  transition: {}
  };
  
	//addEndListener={(node, done) => {
	//	node.addEventListener('transitionend', done, false);
	//}}

  render(): Node {
    const { className, transitionStyle, transition, children, ...rest } = this.props;
	const mergedTransition = { ...defaultTransition(), ...transition };
	return (
		<Transition {...mergedTransition}>
			{(state) => (
				<div className={classes(className, block-fade-${state})} style={{
					...defaultStyle(duration),
					...defaultTransitionStyle[state],
					...transitionStyle[state]
				}} {...rest}>
					{children}
				</div>
			)}
		 </Transition>
	);
  }
};
