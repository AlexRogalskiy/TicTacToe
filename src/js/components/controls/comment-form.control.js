'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
//import PropTypes from 'prop-types';
import { style, classes } from 'typestyle';
// import update     from 'react-addons-update';
// import ClassNames from 'classnames';
import Strategy   from 'react-validatorjs-strategy';
import Validation from 'react-validation-mixin';

import BasicInputControl from 'controls/basic-input.control';
import BasicButtonControl from 'controls/basic-button.control';

import FormsValidator from 'validators/forms.validator';

import Logger from 'libs/logger.lib';

/* @flow */
type Props = {
    dataClass?: Object<any>;
    validator?: string;
	buttonSubmitMessage?: string
	onSubmit?: func;
    fields: Object<any>;
};
type State = {
	fields: Object<any>;
};

class CommentFormControl extends Component<Props, State> {
  displayName: string = 'CommentFormControl';
  
  form: ?HTMLFormElement;
	  
  state: State = {
	fields: {}  
  };

  static defaultProps: Props = {
    dataClass: { formClass: 'comment-form', fieldClass: 'field', buttonClass: 'button button-submit', errorClass: 'error', errorMessageClass: 'help-block' },
    validator: 'commentForm',
    buttonSubmitMessage: 'Send',
    method: 'POST',
	fields: {}
  };
  
  getValidatorData(): State {
    return this.state;
  }
  
  constructor(props: Props): void {
    super(props);
    this.activateValidation = this.activateValidation.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.validatorTypes = FormsValidator[props.validator] || [];
  }
  
  activateValidation(field: string): func {
    return (event: SyntheticEvent<HTMLButtonElement>) => {
      Strategy.activateRule(this.validatorTypes, field);
      this.props.handleValidation(field)(event);
    };
  }
  
  onChange(field: string): func {
    return (event: SyntheticEvent<HTMLInputElement>) => {
      this.state.fields[field].value = event.currentTarget.value;
      const state = { fields: this.state.fields };
      this.setState(state, () => {
        this.props.handleValidation(field)(event);
      });
      //this.refs[field].onChange(event);
    };
  }
  
  onSubmit(e: SyntheticEvent<HTMLFormElement>): void {
    e.preventDefault();
    this.props.validate((error: object) => {
      if (!error) {
        Logger.debug(`Fields: ${this.state.fields.inspect}`);
        this.props.onCommentSubmit(this.state);
        this.setState({ fields: {} });
      }
    });
	if(this.props.onSubmit) {
	   this.props.onSubmit(e);
	}
  }
  
  getClassName(field: string): string {
    return this.props.isValid(field) ? '' : 'has-error';
  }
  
  renderMessageText(messages: array, className: string): Node {
	  return (
		<MessageList messages={messages} className={className}/>
	  );
  }
  
  render(): Node {
    const { className, dataClass, fields, buttonSubmitMessage, validator, validate, isValid, getValidationMessages, clearValidations, handleValidation, ...rest } = this.props;
    const { controlClass, errorClass, errorMessageClass, fieldClass, buttonSubmitClass, ...restClass } = dataClass;
    
	const errorMessages = getValidationMessages(this.props.name) || dataError;
	const controlClassName = classes(
      controlClass,
      errorClass && errorMessages.length > 0
    );

    return (
      <form ref={form => (this.form = form)} className={className} onSubmit={() => this.onSubmit(e)}  {...rest}>
          <div className={controlClassName}>
            fields.map((item: object) => {
              return <BasicInputControl item={item} key={item.id} label={item.label} onChange={this.onChange(item.name)} className=classes(fieldClass, item.className) validator={item.validator} dataClass={restClass} />
            });
          </div>
          { this.renderMessageText(errorMessages, errorMessageClass) }
          <BasicButtonControl type="submit" message={buttonSubmitMessage} className={buttonSubmitClass} />
      </form>
    );
  }
};

export default Validation(Strategy)(CommentFormControl);
