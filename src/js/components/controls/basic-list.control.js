'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
import { style, classes } from 'typestyle';
//import PropTypes from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group/CSSTransitionGroup';
// import update     from 'react-addons-update';
//import { ClassNames } from 'classnames/bind';
// import Logger from 'appRoot/mixins/logger';
// import { BasicListStyle } from 'appRoot/css/components/controls/basicListControl';
// let Styles = ClassNames.bind(BasicListStyle);

const defaultTransition = ({ component: string 				 = '',
							 transitionName: string			 = 'carousel',
							 transitionAppear: bool 		 = true,
							 transitionAppearTimeout: number = 300,
							 transitionEnter: bool 			 = true,
							 transitionEnterTimeout: number  = 300,
							 transitionLeave: bool 			 = true,
							 transitionLeaveTimeout: number  = 300 }) => {
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
    transition?: object
	items?: array
};

export default class BasicListControl extends Component<Props> {
    displayName: string = 'BasicListControl';

    static defaultProps: Props = {
        dataClass: {},
        transition: {},
		items: []
    };

    render(): Node {
        const { dataClass, transition, items, ...rest } = this.props;
		const mergedTransition = { ...defaultTransition({ component: 'ul', name: 'listGroup', appearTimeout: 500 }), ...transition };
        return (
            <CSSTransitionGroup className=classes({ ...defaultTransitionClass(), ...dataClass }) {...mergedTransition}>
                    { items }
            </CSSTransitionGroup>
        );
    }
};
