'use strict';

/**
 * Module dependencies
 */
import { Node } from 'react';
import ReactDOM from 'react-dom';

import { validate } from './utils.lib';

/**
 * get input elements by reference to basic input / input name attribute
 */
export default class Fields {
  displayName: string = 'Fields';
  
  static getInputField(ref: string): Node {
    if (!this.state.isMounted) {
      return;
    }
    return this.refs && this.refs[ref]
      ? ReactDOM.findDOMNode(this.refs[ref]).querySelector('input')
      : ReactDOM.findDOMNode(this).querySelector('[name=' + ref + '] input');
  }

  static validateField(fieldName: string, constraintOverride: Object<any>): boolean {
    let fieldVal = this.getInputField(fieldName).value;
    if (fieldName in this.constraints) {
      let currentConstraint = constraintOverride || this.constraints[fieldName];
      let errors = validate(fieldVal, currentConstraint);
      return !!errors.errors ? errors.errors : false;
    }
    return true;
  }

  static validateFields(nodes: Array<any>): Object<any> {
    let detail = {},
      validationState = {},
      hasErrors = false;
    e.preventDefault();
    nodes = nodes || this.refs.form.querySelectorAll('input');
    Array.prototype.forEach.call(
      nodes,
      function(v) {
        var fieldName = v.getAttribute('name');
        var errors = this.validateField(fieldName);
        validationState[fieldName] = {
          $set: errors.length ? errors[0].msg : null,
        };
      }.bind(this)
    );
    return validationState;
  }
};
