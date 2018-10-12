/*"use strict";
/**
 * Module dependencies
 */
import React      from 'react';
// import update     from 'react-addons-update';
// import ClassNames from 'classnames';
import Strategy   from 'react-validatorjs-strategy';
import Validation from 'react-validation-mixin';
import Validators from 'appRoot/js/mixins/validators';

import BasicTextControl from 'appRoot/js/controls/basicTextControl';
import BasicButtonControl from 'appRoot/js/controls/basicButtonControl';

import HelpText   from 'appRoot/js/mixins/utility';
import Logger     from 'appRoot/js/mixins/logger';

let Types = React.PropTypes;

class CommentForm extends React.Component {
  displayName: 'CommentForm'
  static propTypes: {
    dataClass: Types.object,
    validator: Types.string,
    fields: Types.object,
    item: Types.object,
    key: Types.string
  }
  static defaultProps = {
    dataClass: { formClass: 'form', fieldClass: 'field', buttonClass: 'btn btn-lg', errorClass: 'has-error', errorMessageClass: 'help-block' },
    validator: '',
    fields: {},
    buttonFormLabel: 'Send',
    method: 'POST',
    item: {},
    key: ''
  }
  getValidatorData() {
    return this.state;
  }
  constructor(props) {
    super(props);
    this.activateValidation = this.activateValidation.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      dataClass: props.dataClass,
      validator: props.validator,
      fields: props.fields,
      buttonFormLabel: props.buttonFormLabel,
      method: props.method,
      item: props.item,
      key: props.key
    };
    this.validatorTypes = Validators[this.props.validator];
  }
  activateValidation(field) {
    return event => {
      Strategy.activateRule(this.validatorTypes, field);
      this.props.handleValidation(field)(event);
    };
  }
  onChange(field) {
    return event => {
      this.state.fields[field].value = event.target.value;
      const state = { fields: this.state.fields };
      this.setState(state, () => {
        this.props.handleValidation(field)(event);
      });
      //this.refs[field].onChange(event);
    };
  }
  onSubmit(e) {
    e.preventDefault();
    this.props.validate((error) => {
      if (!error) {
        Logger.debug("Fields: " + this.state.fields.inspect);
        this.props.onCommentSubmit(this.state);
        this.setState({ fields: {} });
      }
    });
  }
  getClassName(field) {
    return this.props.isValid(field) ? '' : 'has-error';
  }
  render() {
    const self = this;
    const { dataClass, fields, buttonFormLabel, validator, errors, validate, isValid, getValidationMessages, clearValidations, handleValidation, ...rest } = this.props;
    const { fieldClass, buttonClass, ...restClass } = dataClass;
    
    let errorMessage = getValidationMessages(rest.name);
    let formClass = restClass.formClass;
    if (errorMessage.length > 0) {
      formClass += ' ' + restClass.errorClass;
    }
    return (
      <form onSubmit={rest.onSubmit ? rest.onSubmit : self.onSubmit}  {...rest}>
          <div className={formClass}>
            fields.map(function(item) {
              return <BasicTextControl item={item} key={item.id} label={item.label} onChange={rest.onChange ? rest.onChange : self.onChange(rest.name)} className={item.className ? item.className : fieldClass} validator={item.validator} dataClass={restClass} />
            });
          </div>
          <HelpText messages={errorMessage} className={dataClass.errorMessageClass} />
          <BasicButtonControl type="submit" message={buttonFormLabel} className={buttonClass} />
      </form>
    );
  }
};

export default Validation(Strategy)(CommentForm);*/