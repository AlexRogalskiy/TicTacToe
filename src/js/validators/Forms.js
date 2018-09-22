"use strict";

/**
 * Module dependencies
 */
import { Strategy } from 'react-validatorjs-strategy';

function checkValidity(validator) {
    validator.lang = 'en';
}

const Forms = {
    profileControl: Strategy.createInactiveSchema(
        {
            // author: 'required',
            // text: 'required|min:10|max:50',
            // label: 'required|min:10|max:500',
            // src: 'required',
            // name: 'min:10'
        },
        {
            // 'min.text': 'Enter a message between 10 and 50 characters',
            // 'max.text': 'Enter a message between 10 and 50 characters',
            // "required.label": "Enter valid image :attribute",
            // "required.src": "Enter valid image :attribute",
            // "numeric.name": "Enter valid numeric :attribute"
        },
        function checkValidity(validator) {
            validator.lang = 'en';
        }
    ),
    textInput: Strategy.createInactiveSchema(
        {

        },
        {

        },
        function checkValidity(validator) {
            validator.lang = 'en';
        }
    ),
    imageInput: Strategy.createInactiveSchema(
        {

        },
        {

        },
        function checkValidity(validator) {
            validator.lang = 'en';
        }
    )
};

export default Forms;