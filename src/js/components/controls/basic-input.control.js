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

type Props = {
	dataClass?: object,
    dataError?: array,
	isDisabled?: bool,
    validator?: string,
	onBlur?: func,
	onChange?: func,
	children?: React.Node
};
type State = {
	isDisabled: bool
};

class BasicInputControl extends Component<Props, State> {
  get displayName: string = 'BasicInputControl';

  input: ?HTMLInputElement;
  
	state: State = {
		isDisabled: false
	};
	
  static defaultProps: Props = {
	  className: 'basic-input input-group',
      dataClass: {
        controlClass: 'row no-gutters',
        errorClass: 'error',
		errorMessageClass: 'help-block',
        inputClass: 'form-control',
      },
      dataError: [],
	  isDisabled: false,
      validator: 'input'
  };

  constructor(props: Props): void {
    super(props);
    this.onBlur = this.onBlur.bind(this);
    this.onChange = this.onChange.bind(this);
    this.validatorTypes = FormsValidator[props.validator] || [];
	this.state = { isDisabled: props.isDisabled };
  }

  getValidatorData(): object {
    return this.state;
  }

  onBlur(field: string): func {
    return (event: SyntheticEvent<HTMLInputElement>) => {
      let state = { field: event.currentTarget.value };
      Strategy.activateRule(this.validatorTypes, field);
      this.setState(state, () => {
        this.props.handleValidation(field)(event);
      });
      if (this.props.onBlur) {
        this.props.onBlur(event);
      }
    };
  }

  onChange(field: string): func {
    return (event: SyntheticEvent<HTMLInputElement>) => {
      let state = { field: event.currentTarget.value };
      Strategy.activateRule(this.validatorTypes, field);
      this.setState(state, () => {
        this.props.handleValidation(field)(event);
      });
      if (this.props.onChange) {
        this.props.onChange(event);
      }
    };
  }
  
  renderMessageText(messages: array, className: string): Node {
	  return (
		<MessageList messages={messages} className={className} />
	  );
  }

  render(): Node {
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
              this.input = input;
            }}
            onChange={this.onChange(this.props.name)}
            onBlur={this.onBlur(this.props.name)}
			disabled={this.state.isDisabled}
            {...rest}
          />
          {children}
        </div>
		{ this.renderMessageText(errorMessages, dataClass.errorMessageClass) }
      </div>
    );
  }
}

export default Validation(Strategy)(BasicInputControl);
