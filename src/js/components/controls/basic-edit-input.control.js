'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
//import PropTypes from 'prop-types';
import { style, classes } from 'typestyle';

import Strategy from 'react-validatorjs-strategy';
import Validation from 'react-validation-mixin';

import { MessageList } from 'app-root/libs/elements.lib';
import FormsValidator from 'app-root/validators/forms.validator';

import ButtonControl from 'app-root/components/controls/button.control';
import InputControl from 'app-root/components/controls/input.control';
import IconElement from 'app-root/components/elements/icon.element';

type Props = {
	dataClass?: object,
    dataError?: array,
	isDisabled?: bool,
    validator?: string,
	onBlur?: func,
	onChange?: func,
	onEdit?: func,
	onUpdate?: func,
	children?: React.Node
};
type State = {
	isEditing: bool,
	isDisabled: bool
};

class BasicEditInputControl extends Component<Props, State> {
  displayName: string = 'BasicEditInputControl';

  input: ?HTMLInputElement;
  
  state: State = {
	  isEditing: false,
	  isDisabled: true
  };
  
  static defaultProps: Props = {
      className: 'basic-edit-input input-group',
      dataClass: {
			controlClass: 'row no-gutters',
			errorClass: 'error',
			errorMessageClass: 'help-block',
			inputClass: 'form-control input',
			buttonClass: 'form-control button',
			labelClass: 'form-control label',
			iconClass: 'glyphicon glyphicon-ok',
			iconEditClass: 'glyphicon glyphicon-pencil'
      },
      dataError: [],
	  isDisabled: false,
      validator: 'editInput'
  };

  constructor(props: Props): void {
    super(props);
    this.onBlur = this.onBlur.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
    this.validatorTypes = FormsValidator[props.validator] || [];
  }

  getValidatorData(): object {
    return this.state;
  }

  onBlur(field: string): func {
    return (event: SyntheticEvent<HTMLInputElement>) => {
      //let state = {};
      //state[field] = event.target.value;
      //Strategy.activateRule(this.validatorTypes, field);
      //this.setState(state, () => {
      //  this.props.handleValidation(field)(event);
      //});
	  this.setState({ field: event.currentTarget.value });
	  this.refs[field].onBlur(event);
      if (this.props.onBlur) {
        this.props.onBlur(event);
      }
    };
  }

  onChange(field: string): func {
    return (event: SyntheticEvent<HTMLInputElement>) => {
      //let state = {};
      //state[field] = event.target.value;
      //Strategy.activateRule(this.validatorTypes, field);
      //this.setState(state, () => {
      //  this.props.handleValidation(field)(event);
      //});
	  this.setState({ field: event.currentTarget.value });
	  this.refs[field].onChange(event);
      if (this.props.onChange) {
        this.props.onChange(event);
      }
    };
  }
  
  	onEdit(field: string): func {
		return (event: SyntheticEvent<HTMLButtonElement>) => {
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
  
  	onUpdate(field: string): func {
		return (event: SyntheticEvent<HTMLButtonElement>) => {
		  let state = { isEditing: false };
		  //state[field] = event.currentTarget.value;
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
	
	renderButton(): Node {
		return (
			this.state.isEditing
				? 	<ButtonControl onClick={this.onUpdate(this.props.name)} className={this.props.dataClass.buttonClass}>
						<IconElement className={this.props.dataClass.iconClass} />
							&nbsp;Update
					</ButtonControl>
				: 	<ButtonControl onClick={this.onEdit(this.props.name)} className={this.props.dataClass.buttonClass}>
						<IconElement className={this.props.dataClass.iconEditClass} />
							&nbsp;Edit
					</ButtonControl>
		);
	}
	
  renderMessageText(messages: array, className: string): Node {
	  return (
		<MessageList messages={messages} className={className}/>
	  );
  }

  render(): Node {
    const {
      className,
	  onChange,
	  onBlur,
	  label,
      children,
	  isDisabled,
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
				<InputControl ref={input => (this.input = input)} onChange={this.onChange(this.props.name)} onBlur={this.onBlur(this.props.name)} isDisabled={this.state.isDisabled} {...rest}>
					{ this.renderButton() }
				</InputControl>
			</div>
			{ this.renderMessageText(errorMessages, dataClass.errorMessageClass) }
		</div>
	);
  }
};

export default Validation(Strategy)(BasicEditInputControl);
