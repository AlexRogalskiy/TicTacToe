'use strict';

/**
 * Module dependencies
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { style, classes } from 'typestyle';
import { Transition } from 'react-transition-group';

const defaultStyle = (duration = 300) => {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0
};

const defaultTransitionStyle = {
  entering: { opacity: 0 },
  entered:  { opacity: 1 }
};

const defaultTransition = (transitionIn = false) => {
	in: transitionIn,
	timeout: {
		enter: 300,
		exit: 500,
	}
};

export default class BlockFadeTransition extends Component {
  get displayName() {
    return 'BlockFadeTransition';
  }
  
  static get propTypes() {
    return {
	  transition: PropTypes.object
    };
  }

  static get defaultProps() {
    return {
      className: 'block-fade-transition',
	  transition: {}
    };
  }
  
	//addEndListener={(node, done) => {
	//	node.addEventListener('transitionend', done, false);
	//}}

  render() {
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
