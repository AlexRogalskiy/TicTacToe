'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
//import PropTypes from 'prop-types';
import { style, classes } from 'typestyle';

import Strategy from 'react-validatorjs-strategy';
import Validation from 'react-validation-mixin';

import { MessageList } from 'libs/elements.lib';
import FormsValidator from 'validators/forms.validator';

/* @flow */
type Props = {
	dataClass?: Object<any>;
    dataError?: Array<string>;
	isDisabled?: boolean;
    validator?: string;
	onClick?: func;
	children?: Node;
};
type State = {
	isDisabled: boolean;
};

class BasicButtonControl extends Component<Props, State> {
  displayName: string = 'BasicButtonControl';
  
  state: State = {
	  isDisabled: false
  };

  button: ?HTMLButtonElement;
  
  static defaultProps: Props = {
	  className: 'basic-button button-group',
      dataClass: {
        controlClass: 'row no-gutters',
        errorClass: 'error',
		errorMessageClass: 'help-block',
        inputClass: 'form-control',
      },
      dataError: [],
	  isDisabled: false,
	  validator: 'button'
  };

  constructor(props: Props): void {
    super(props);
    this.onClick = this.onClick.bind(this);
	this.validatorTypes = FormsValidator[props.validator] || [];
	this.state = { isDisabled: props.isDisabled };
  }

  getValidatorData(): State {
    return this.state;
  }

  onClick(field: string): func {
    return (event: SyntheticEvent<HTMLButtonElement>) => {
      let state = { field: event.currentTarget.src };
      Strategy.activateRule(this.validatorTypes, field);
      this.setState(state, () => {
        this.props.handleValidation(field)(event);
      });
      if (this.props.onClick) {
        this.props.onClick(event);
      }
    };
  }
  
  renderMessageText(messages: Array<string>, className: string): Node {
	  return (
		<MessageList messages={messages} className={className}/>
	  );
  }

  render(): Node {
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
      dataClass.errorClass && errorMessages.length > 0
    );
    rest.className = dataClass.inputClass;
    return (
	 <div className={className}>
        <div className={controlClassName}>
			<button ref={button => (this.button = button)} onClick={this.onClick(this.props.name)} disabled={this.state.isDisabled} {...rest}>
				{children}
			</button>
		</div>
		{ this.renderMessageText(errorMessages, dataClass.errorMessageClass) }
      </div>
    );
  }
};

export default Validation(Strategy)(BasicButtonControl);
