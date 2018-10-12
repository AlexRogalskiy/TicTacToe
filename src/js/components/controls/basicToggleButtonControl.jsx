"use strict";
/**
 * Module dependencies
 */
import React      from 'react';
import ReactDOM	  from 'react-dom';
// import update     from 'react-addons-update';
import ClassNames from 'classnames/bind';

import Logger     from 'appRoot/js/mixins/logger';
import BasicButtonControl from 'appRoot/js/components/controls/basicButtonControl';
import BasicToggleButtonStyle from 'appRoot/css/components/controls/basicToggleButtonControl';

let Types = React.PropTypes;
let Styles = ClassNames.bind(BasicToggleButtonStyle);

export default class BasicToggleButtonControl extends BasicButtonControl {
	displayName: 'BasicToggleButtonControl'
	static propTypes: {
		flipped: Types.bool
	}
	static defaultProps = {
		className: 'btnToggle btn',
        flipped: false
    }
	constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.state = {
        	className: props.className,
            flipped: props.flipped
        };
    }
	onClick(e) {
		this.flip();
		super.onClick(e);
	}
	flip() {
    	this.setState({ flipped: !this.state.flipped });
  	}
	render() {
		const { flipped, ...rest } = this.props;
		rest.className = Styles(rest.className, {
	      	// pressed: this.state.isPressed,
	      	// hover: !this.state.isPressed && this.state.isHovered,
	      	// disabled: this.state.isDisabled,
	      	flipped: this.state.flipped
    	});
    	this.props = rest;
    	return super.render();
	}
};