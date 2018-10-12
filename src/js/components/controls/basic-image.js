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

class BasicImage extends Component {
  get displayName() {
    return 'BasicImage';
  }

  static get propTypes() {
    return {
      dataClass: PropTypes.object,
      dataError: PropTypes.array,
      validator: PropTypes.string
    };
  }

  static get defaultProps() {
    return {
      className: 'basic-image input-group',
      dataClass: {
        controlClass: 'row no-gutters',
        errorClass: 'error',
        imageClass: 'form-control',
      },
      dataError: [],
      validator: 'imageInput',
    };
  }

  constructor(props) {
    super(props);
    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);
    this.onChange = this.onChange.bind(this);
    this.validatorTypes = Forms[props.validator] || [];
  }

  getValidatorData() {
    return this.state;
  }

  onMouseOver(field) {
    return event => {
      let state = {};
      state[field] = event.target.src;
      Strategy.activateRule(this.validatorTypes, field);
      this.setState(state, () => {
        this.props.handleValidation(field)(event);
      });
      if (this.props.onMouseOver) {
        this.props.onMouseOver(event);
      }
    };
  }
  
  onMouseOut(field) {
    return event => {
      let state = {};
      state[field] = event.target.src;
      Strategy.activateRule(this.validatorTypes, field);
      this.setState(state, () => {
        this.props.handleValidation(field)(event);
      });
      if (this.props.onMouseOut) {
        this.props.onMouseOut(event);
      }
    };
  }

  onChange(field) {
    return event => {
      let state = {};
      state[field] = event.target.src;
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
            ref={input => {
              this.imageInput = input;
            }}
            onChange={this.onChange(this.props.name)}
            onMouseOver={this.onMouseOver(this.props.name)}
            onMouseOut={this.onMouseOut(this.props.name)}
            {...rest}
          />
          {children}
        </div>
        { this.renderMessageText(errorMessages) }
      </div>
    );
  }
}

export default Validation(Strategy)(BasicImage);
