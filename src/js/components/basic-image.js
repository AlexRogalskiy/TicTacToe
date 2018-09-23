"use strict";

/**
 * Module dependencies
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { style, classes } from 'typestyle';

import Strategy   from 'react-validatorjs-strategy';
import Validation from 'react-validation-mixin';

import { MessageList } from '../libs/utils';
import Forms from '../validators/forms';

class BasicImage extends Component {
	
	get displayName() {
		return 'BasicImage';
	}
	
	static get propTypes() {
		return {
			dataClass: PropTypes.object,
			dataError: PropTypes.array,
			validator: PropTypes.string
		};
	}
	
	constructor(props) {
        super(props);
        this.onBlur = this.onBlur.bind(this);
        this.onChange = this.onChange.bind(this);
		this.validatorTypes = Forms[props.validator] || [];
	}
	
	static get defaultProps() {
		return {
			className: 'basic-image input-group',
        	dataClass: { controlClass: 'row no-gutters', errorClass: 'error', imageClass: 'form-control' },
			dataError: [],
			validator: 'imageInput'
        };
    }
	
	getValidatorData() {
	    return this.state;
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
			Strategy.activateRule(this.validatorTypes, field);
	      	this.setState(state, () => {
				this.props.handleValidation(field)(event);
			});
			if(this.props.onChange) {
				this.props.onChange(event);
			}
	    };
	}

    render() {
		const { className, children, dataClass, dataError, isValid, getValidationMessages, clearValidations, handleValidation, validate, ...rest } = this.props;
		const errorMessages = getValidationMessages(this.props.name) || dataError;
		const controlClass = classes(
			dataClass.controlClass,
			errorMessages.length > 0 && dataClass.errorClass
		);
		rest.className = dataClass.imageClass;
        return (
			<div className={className}>
				<div className={controlClass}>
					<img ref={(input) => {this.imageInput = input}} onChange={this.onChange(this.props.name)} onBlur={this.onBlur(this.props.name)} {...rest} />
					{children}
				</div>
                <MessageList messages={errorMessages} className={dataClass.errorClass} />
			</div>
		);
    }
}

export default Validation(Strategy)(BasicImage);