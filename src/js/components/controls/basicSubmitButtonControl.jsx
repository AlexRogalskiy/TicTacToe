"use strict";
/**
 * Module dependencies
 */
import React      from 'react';
// import ReactDOM	  from 'react-dom';
// import update     from 'react-addons-update';
import ClassNames from 'classnames/bind';

import Logger     from 'appRoot/js/mixins/logger';
import BasicButtonControl from 'appRoot/js/components/controls/basicButtonControl';
import BasicSubmitButtonStyle from 'appRoot/css/components/controls/basicSubmitButtonControl';

let Types = React.PropTypes;
let Styles = ClassNames.bind(BasicSubmitButtonStyle);

export default class BasicSubmitButtonControl extends BasicButtonControl {
	displayName: 'BasicSubmitButtonControl'
	static propTypes: {
		messageInProgress: Types.string
	}
	static defaultProps = {
        messageInProgress: 'Processing...',
        className: 'btnSubmit btn',
        type: 'submit',
        store: {
        	submissionInProgress: false,
        	error: false,
        	disabled: false
        }
    }
	constructor(props) {
        super(props);
        this.state = {
            messageInProgress: props.messageInProgress,
            className: props.className,
        };
    }
	render() {
		const { store, messageInProgress, ...rest } = this.props;
		rest.message = store.submissionInProgress ? messageInProgress : this.props.message;
		rest.className = Styles(rest.className, {
	      	inProgress: store.submissionInProgress,
	      	error: store.errorOccurred,
	      	disabled: store.valid,
    	});
    	this.props = rest;
    	return super.render();
	}
};