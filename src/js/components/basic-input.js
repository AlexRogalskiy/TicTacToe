"use strict";

/**
 * Module dependencies
 */
import React, { Component } from 'react';
import { style, classes } from 'typestyle';

import Strategy   from 'react-validatorjs-strategy';
import Validation from 'react-validation-mixin';
//import update       from 'react-addons-update';
//this.setState(update(this.state, { validity: validationState }));

import { MessageList } from '../libs/utils';
import Forms from '../validators/forms';

class BasicInput extends Component {
	displayName: 'BasicInput'
	
	propTypes: {
		dataClass: React.PropTypes.object,
		dataError: React.PropTypes.array,
		validator: React.PropTypes.string
	}
	
	constructor(props) {
        super(props);
        this.onBlur = this.onBlur.bind(this);
        this.onChange = this.onChange.bind(this);
		this.validatorTypes = Forms[props.validator];
	}
	
	static get defaultProps() {
		return {
			className: 'basic-input input-group',
        	dataClass: { controlClass: 'row no-gutters', errorClass: 'error', inputClass: 'form-control' },
			validator: 'textInput'
        };
    }
	
	onBlur(field) {
    	return event => {
	      	let state = {};
	      	state[field] = event.target.src;
	      	Strategy.activateRule(this.validatorTypes, field);
	      	this.setState(state, () => {
				this.props.handleValidation(field)(event);
			});
			if(this.props.onBlur) {
				this.props.onBlur(event);
			}
	    };
	}
	
	onChange(field) {
		return event => {
	      	let state = {};
	      	state[field] = event.target.src;
	      	this.setState(state, () => {
				this.props.handleValidation(field)(event);
			});
			if(this.props.onChange) {
				this.props.onChange(event);
			}
	    };
	}

    render() {
		const { className, children, dataClass, dataError, ...rest } = this.props;
		const errorMessages = getValidationMessages(this.props.name) || dataError;
		const controlClass = classes(
			dataClass.controlClass
			errorMessages.length > 0 && dataClass.errorClass
		);
		rest.className = dataClass.inputClass;
		return (
			<div className={className}>
				<div className={controlClass}>
					<input ref={(input) => {this.textInput = input}} onChange={this.onChange(this.props.name)} onBlur={this.onBlur(this.props.name)} {...rest} />
					{children}
				</div>
				<MessageList messages={errorMessages} className={dataClass.errorClass} />
			</div>
		);
    }
}

export default Validation(Strategy)(BasicInput);