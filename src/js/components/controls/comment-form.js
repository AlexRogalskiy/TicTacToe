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
import Validators from 'appRoot/js/mixins/validators';

import BasicTextControl from 'appRoot/js/controls/basicTextControl';
import BasicButtonControl from 'appRoot/js/controls/basicButtonControl';

import Forms from 'app-root/validators/forms';

import HelpText   from 'appRoot/js/mixins/utility';
import Logger     from 'appRoot/js/libs/logger';

type Props = {
    dataClass?: object,
    validator?: string,
	buttonSubmitMessage?: string,
    fields: object
};
type State = {
	fields: object
};

class CommentForm extends Component<Props, State> {
  displayName: string = 'CommentForm';
  
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
  
  getValidatorData(): object {
    return this.state;
  }
  
  constructor(props: Props): void {
    super(props);
    this.activateValidation = this.activateValidation.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.validatorTypes = Forms[props.validator] || [];
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
      <form ref={form => (this.form = form)} className={className} onSubmit={this.onSubmit}  {...rest}>
          <div className={controlClassName}>
            fields.map((item: object) => {
              return <BasicText item={item} key={item.id} label={item.label} onChange={this.onChange(item.name)} className=classes(fieldClass, item.className) validator={item.validator} dataClass={restClass} />
            });
          </div>
          { this.renderMessageText(errorMessages, errorMessageClass) }
          <BasicButton type="submit" message={buttonSubmitMessage} className={buttonSubmitClass} />
      </form>
    );
  }
};

export default Validation(Strategy)(CommentForm);
