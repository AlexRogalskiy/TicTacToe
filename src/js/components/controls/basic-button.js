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
import Forms from '../../validators/forms';

class BasicButton extends Component {
  get displayName() {
    return 'BasicButton';
  }

  static get propTypes() {
    return {
      dataClass: PropTypes.object,
      dataError: PropTypes.array,
	  isDisabled: PropTypes.bool,
      validator: PropTypes.string,
    };
  }

  static get defaultProps() {
    return {
      className: 'basic-button button-group',
      dataClass: {
        controlClass: 'row no-gutters',
        errorClass: 'error',
        inputClass: 'form-control',
      },
      dataError: [],
	  isDisabled: false,
	  validator: 'button'
    };
  }

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
	this.validatorTypes = Forms[props.validator] || [];
  }

  getValidatorData() {
    return this.state;
  }

  onClick(field) {
    return event => {
      let state = {};
      state[field] = event.target.src;
      Strategy.activateRule(this.validatorTypes, field);
      this.setState(state, () => {
        this.props.handleValidation(field)(event);
      });
      if (this.props.onClick) {
        this.props.onClick(event);
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
	  onClick,
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
			<button ref={input => {this.buttonInput = input;}} onClick={this.onClick(this.props.name)} disabled={isDisabled} {...rest}>
				{children}
			</button>
		</div>
		{ this.renderMessageText(errorMessages) }
      </div>
    );
  }
}

export default Validation(Strategy)(BasicButton);
