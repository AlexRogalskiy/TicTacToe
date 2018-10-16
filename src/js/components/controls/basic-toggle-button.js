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
//import Logger     from 'appRoot/js/mixins/logger';
import BasicButton from 'appRoot/js/components/controls/basic-button';
//import BasicToggleButtonStyle from 'appRoot/css/components/controls/basicToggleButtonControl';
//let Styles = ClassNames.bind(BasicToggleButtonStyle);

type Props = {
	dataClass?: object,
	flipped?: bool
};
type State = {
	flipped: bool
};

export default class BasicToggleButton extends BasicButton {
	displayName: string = 'BasicToggleButton';

	state: State = {
		flipped: false
	};

	static defaultProps: Props = {
		className: 'button button-toggle',
		dataClass: { flippedClass: 'button-flipped' },
        flipped: false
    };

	constructor(props: Props): void {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.state = { flipped: props.flipped };
    }

	onClick(event: SyntheticEvent<HTMLButtonElement>) {
		this.flip();
		super.onClick(event);
	}

	flip() {
    	this.setState({ flipped: !this.state.flipped });
  	}
	render() {
		const { className, dataClass, flipped, ...rest } = this.props;
		const { flippedClass, ...restClass } = dataClass;
		rest.className = classes(
			className
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
