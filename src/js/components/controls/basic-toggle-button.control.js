'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
//import PropTypes from 'prop-types';
import { style, classes } from 'typestyle';
//import ReactDOM	  from 'react-dom';
// import update     from 'react-addons-update';
//import ClassNames from 'classnames/bind';
//import Logger     from 'mixins/logger';
import BasicButtonControl from 'components/controls/basic-button.control';
//import BasicToggleButtonStyle from 'css/components/controls/basicToggleButtonControl';
//let Styles = ClassNames.bind(BasicToggleButtonStyle);

/* @flow */
type Props = {
	dataClass?: Object<any>;
	flipped?: boolean;
	onClick?: func;
};
type State = {
	flipped: boolean;
};

export default class BasicToggleButtonControl extends BasicButtonControl {
	displayName: string = 'BasicToggleButtonControl';

	state: State = {
		flipped: this.props.flipped
	};

	static defaultProps: Props = {
		className: 'button button-toggle',
		dataClass: { flippedClass: 'button-flipped' },
        flipped: false
    };

	constructor(props: Props): void {
        super(props);
        this.onClick = this.onClick.bind(this);
        //this.state = { flipped: props.flipped };
    }

	onClick(event: SyntheticEvent<HTMLButtonElement>): func {
		this.flip();
		return super.onClick(event);
	}

	flip(): void {
    	this.setState({ flipped: !this.state.flipped });
  	}
	render() {
		const { className, dataClass, flipped, ...rest } = this.props;
		const { flippedClass, ...restClass } = dataClass;
		rest.className = classes(
			className,
	      	// pressed: this.state.isPressed,
	      	// hover: !this.state.isPressed && this.state.isHovered,
	      	// disabled: this.state.isDisabled,
	      	dataClass && this.state.flipped
    	);
		rest.dataClass = restClass;
    	this.props = rest;
    	return super.render();
	}
};
