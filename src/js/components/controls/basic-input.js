'use strict';

/**
 * Module dependencies
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { style, classes } from 'typestyle';

import Strategy from 'react-validatorjs-strategy';
import Validation from 'react-validation-mixin';

import { MessageList } from 'app-root/libs/elements';
import Forms from 'app-root/validators/forms';

class BasicInput extends Component {
  get displayName() {
    return 'BasicInput';
  }

  static get propTypes() {
    return {
      dataClass: PropTypes.object,
      dataError: PropTypes.array,
	  isDisabled: PropTypes.bool,
      validator: PropTypes.string
    };
  }

  static get defaultProps() {
    return {
      className: 'basic-input input-group',
      dataClass: {
        controlClass: 'row no-gutters',
        errorClass: 'error',
        inputClass: 'form-control',
      },
      dataError: [],
	  isDisabled: false,
      validator: 'input'
    };
  }

  constructor(props) {
    super(props);
    this.onBlur = this.onBlur.bind(this);
    this.onChange = this.onChange.bind(this);
    this.validatorTypes = Forms[props.validator] || [];
  }

  getValidatorData() {
    return this.state;
  }

  onBlur(field) {
    return event => {
      let state = {};
      state[field] = event.target.value;
      Strategy.activateRule(this.validatorTypes, field);
      this.setState(state, () => {
        this.props.handleValidation(field)(event);
      });
      if (this.props.onBlur) {
        this.props.onBlur(event);
      }
    };
  }

  onChange(field) {
    return event => {
      let state = {};
      state[field] = event.target.value;
      Strategy.activateRule(this.validatorTypes, field);
      this.setState(state, () => {
        this.props.handleValidation(field)(event);
      });
      if (this.props.onChange) {
        this.props.onChange(event);
      }
    };
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
	  isDisabled,
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
    rest.className = dataClass.inputClass;
    return (
      <div className={className}>
        <div className={controlClassName}>
          <input
            ref={input => {
              this.textInput = input;
            }}
            onChange={this.onChange(this.props.name)}
            onBlur={this.onBlur(this.props.name)}
			disabled={isDisabled}
            {...rest}
          />
          {children}
        </div>
		{ this.renderMessageText(errorMessages) }
      </div>
    );
  }
}

export default Validation(Strategy)(BasicInput);
