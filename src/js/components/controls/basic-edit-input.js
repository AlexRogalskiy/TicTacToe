'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
//import PropTypes from 'prop-types';
import { style, classes } from 'typestyle';

import Strategy from 'react-validatorjs-strategy';
import Validation from 'react-validation-mixin';

import { MessageList } from 'app-root/libs/elements';
import Forms from 'app-root/validators/forms';

import Button from 'app-root/components/controls/button';
import Input from 'app-root/components/controls/input';
import Icon from 'app-root/components/elements/icon';

type Props = {
	dataClass?: object,
    dataError?: array,
	isDisabled?: bool,
    validator?: string
};
type State = {
	isEditing: bool,
	isDisabled: bool
};

class BasicEditInput extends Component<Props, State> {
  displayName: string = 'BasicEditInput';

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
    this.validatorTypes = Forms[props.validator] || [];
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
	
  renderMessageText(messages: array): Node {
	  return (
		<MessageList messages={messages} className={this.props.dataClass.errorClass}/>
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
				<Input ref={input => (this.input = input)} onChange={this.onChange(this.props.name)} onBlur={this.onBlur(this.props.name)} isDisabled={this.state.isDisabled} {...rest}>
					{ this.renderButton() }
				</Input>
			</div>
			{ this.renderMessageText(errorMessages) }
		</div>
	);
  }
};

export default Validation(Strategy)(BasicEditInput);
