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
    dataError?: array;
    validator?: string;
	onMouseOver?: func;
	onMouseOut?: func;
	onChange?: func;
	children?: Node;
};

class BasicImageControl extends Component<Props> {
  displayName: string = 'BasicImageControl';

  image: ?HTMLImageElement;
  
  static defaultProps: Props = {
      className: 'basic-image input-group',
      dataClass: {
        controlClass: 'row no-gutters',
        errorClass: 'error',
		errorMessageClass: 'help-block',
        imageClass: 'form-control',
      },
      dataError: [],
      validator: 'imageInput'
  }

  constructor(props: Props): void {
    super(props);
    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);
    this.onChange = this.onChange.bind(this);
    this.validatorTypes = FormsValidator[props.validator] || [];
  }

  getValidatorData(): State {
    return this.state;
  }

  onMouseOver(field: string): func {
    return (event: SyntheticEvent<HTMLElement>) => {
      let state = {};
      state[field] = event.currenTarget.src;
      Strategy.activateRule(this.validatorTypes, field);
      this.setState(state, () => {
        this.props.handleValidation(field)(event);
      });
      if (this.props.onMouseOver) {
        this.props.onMouseOver(event);
      }
    };
  }
  
  onMouseOut(field: string): func {
    return (event: SyntheticEvent<HTMLElement>) => {
      let state = {};
      state[field] = event.currenTarget.src;
      Strategy.activateRule(this.validatorTypes, field);
      this.setState(state, () => {
        this.props.handleValidation(field)(event);
      });
      if (this.props.onMouseOut) {
        this.props.onMouseOut(event);
      }
    };
  }

  onChange(field: string): func {
    return (event: SyntheticEvent<HTMLElement>) => {
      let state = {};
      state[field] = event.currenTarget.src;
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
		<MessageList messages={messages} className={className}/>
	  );
  }
  
  render(): Node {
    const {
      className,
	  onChange,
	  onMouseOver,
	  onMouseOut,
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
    rest.className = dataClass.imageClass;
    return (
      <div className={className}>
        <div className={controlClassName}>
          <img
            ref={image => {
              this.image = image;
            }}
            onChange={this.onChange(this.props.name)}
            onMouseOver={this.onMouseOver(this.props.name)}
            onMouseOut={this.onMouseOut(this.props.name)}
            {...rest}
          />
          {children}
        </div>
        { this.renderMessageText(errorMessages, dataClass.errorMessageClass) }
      </div>
    );
  }
}

export default Validation(Strategy)(BasicImageControl);
