'use strict';

/**
 * Module dependencies
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { style, classes } from 'typestyle';

import Strategy from 'react-validatorjs-strategy';
import Validation from 'react-validation-mixin';

import { MessageList } from '../../libs/elements';
import Button from './button';
import Input from './input';
import Icon from '../elements/icon';
import Forms from '../../validators/forms';

class BasicEditInput extends Component {
  get displayName() {
    return 'BasicEditInput';
  }

  static get propTypes() {
    return {
      dataClass: PropTypes.object,
      dataError: PropTypes.array,
	  isEditing: PropTypes.bool,
      validator: PropTypes.string
    };
  }

  static get defaultProps() {
    return {
      className: 'basic-edit-input input-group',
      dataClass: {
        controlClass: 'row no-gutters',
        errorClass: 'error',
        inputClass: 'form-control input',
		buttonClass: 'form-control button',
		labelClass: 'form-control label',
		iconClass: 'glyphicon glyphicon-ok',
		iconEditClass: 'glyphicon glyphicon-pencil'
      },
      dataError: [],
	  isEditing: false,
      validator: 'editInput'
    };
  }

  constructor(props) {
    super(props);
    this.onBlur = this.onBlur.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
    this.validatorTypes = Forms[props.validator] || [];
  }

  getValidatorData() {
    return this.state;
  }

  onBlur(field) {
    return event => {
      //let state = {};
      //state[field] = event.target.value;
      //Strategy.activateRule(this.validatorTypes, field);
      //this.setState(state, () => {
      //  this.props.handleValidation(field)(event);
      //});
	  this.setState({ field: event.target.value });
	  this.refs[field].onBlur(event);
      if (this.props.onBlur) {
        this.props.onBlur(event);
      }
    };
  }

  onChange(field) {
    return event => {
      //let state = {};
      //state[field] = event.target.value;
      //Strategy.activateRule(this.validatorTypes, field);
      //this.setState(state, () => {
      //  this.props.handleValidation(field)(event);
      //});
	  this.setState({ field: event.target.value });
	  this.refs[field].onChange(event);
      if (this.props.onChange) {
        this.props.onChange(event);
      }
    };
  }
  
  	onEdit(field) {
		return event => {
		  //let state = { isEditing: true };
		  //state[field] = event.target.value;
		  //Strategy.activateRule(this.validatorTypes, field);
		  //this.setState(state, () => {
			//this.props.handleValidation(field)(event);
		  //});
		  this.setState({ isEditing: true });
		  this.refs[field].setState({ isDisabled: false });
		  if (this.props.onEdit) {
			this.props.onEdit(event);
		  }
		};
	}
  
  	onUpdate(field) {
		return event => {
		  let state = { isEditing: false };
		  state[field] = event.target.value;
		  Strategy.activateRule(this.validatorTypes, field);
		  this.setState(state, () => {
			this.props.handleValidation(field)(event);
		  });
		  this.refs[field].setState({ isDisabled: true });
		  if (this.props.onUpdate) {
			this.props.onUpdate(event);
		  }
		};
	}
	
	renderButton() {
		return (
			this.state.isEditing
				? 	<Button onClick={this.onUpdate(this.props.name)} className={this.props.dataClass.buttonClass}>
						<Icon className={this.props.dataClass.iconClass} />
							&nbsp;Update
					</Button>
				: 	<Button onClick={this.onEdit(this.props.name)} className={this.props.dataClass.buttonClass}>
						<Icon className={this.props.dataClass.iconEditClass} />
							&nbsp;Edit
					</Button>
		);
	}
	
  renderMessageText(messages) {
	  return (
		<MessageList messages={messages} className={this.props.dataClass.errorClass}/>
	  );
  }

  render() {
    const {
      className,
	  onChange,
	  onBlur,
	  label,
      children,
      dataClass,
      dataError,
      isValid,
      getValidationMessages,
      clearValidations,
      handleValidation,
      validate,
      ...rest
    } = this.props;
    const errorMessages = getValidationMessages(this.props.name) || dataError;
    const controlClassName = classes(
      dataClass.controlClass,
      errorMessages.length > 0 && dataClass.errorClass
    );
    rest.className = dataClass.editInputClass;
	return (
		<div className={className}>
			<label className={dataClass.labelClass} htmlFor={this.props.name}>{label}</label>
			<div className={controlClassName}>
				<Input ref={input => {this.textInput = input;}} onChange={this.onChange(this.props.name)} onBlur={this.onBlur(this.props.name)} isDisabled={!this.state.isEditing} {...rest}>
					{ this.renderButton() }
				</Input>
			</div>
			{ this.renderMessageText(errorMessages) }
		</div>
	);
  }
}

export default BasicEditInput;