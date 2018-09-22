"use strict";

import { validate } from '../libs/utils';
/**
 * get input element by ref to Basic Input or input name attr
 */
export Fields = { 
	getInputField: function (ref) {
		if(!this.isMounted()) {return;}
		//if (!this.isChecked || !this.isMounted) { return; }
		// if(!this.refs[ref]) { return; }
		// if (!this.refs[ref].isMounted) { return; }
		return this.refs[ref] ? 
			ReactDOM.findDOMNode(this.refs[ref]).querySelector('input') : 
			ReactDOM.findDOMNode(this).querySelector('[name=' + ref + '] input'); 
	},
	validateField: function (fieldName, constraintOverride) {
		let fieldVal = this.getInputField(fieldName).value;
		if (fieldName in this.constraints) {
			let currentConstraint = constraintOverride || this.constraints[fieldName];
			let errors = validate(fieldVal, currentConstraint);
			return !!errors.errors ? errors.errors : false;
		}
		return true;
	},
	validateFields: function (nodes) {
		let detail = {}, validationState = {}, hasErrors = false;
		e.preventDefault();
		nodes = nodes || this.refs.form.querySelectorAll('input');
		Array.prototype.forEach.call(nodes, function (v) {
				var fieldName = v.getAttribute('name');
				var errors = this.validateField(fieldName);
				validationState[fieldName] = { $set: errors.length ? errors[0].msg : null };
			}.bind(this)
		);
		return validationState;
	}
};

export default Fields;