'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
//import PropTypes from 'prop-types';
import { style, classes } from 'typestyle';
// import ReactDOM	  from 'react-dom';
// import update     from 'react-addons-update';
//import ClassNames from 'classnames/bind';
//import Logger     from 'appRoot/js/mixins/logger';
import BasicButtonControl from 'app-root/components/controls/basic-button.control';
//import BasicSubmitButtonStyle from 'appRoot/css/components/controls/basicSubmitButtonControl';
//let Styles = ClassNames.bind(BasicSubmitButtonStyle);

type Props = {
	dataClass?: object,
	message?: string,
	progressMessage?: string
};
type State = {
	store: object
};

export default class BasicSubmitButtonControl extends BasicButtonControl {
	displayName: string = 'BasicSubmitButtonControl';

	state: State = {
		store {
			submissionInProgress: false,
			error: false,
			disabled: false
		}
	};

	static defaultProps: Props = {
		className: 'button button-submit',
		dataClass: { progressClass: 'submission-inprogress', errorClass: 'submission-error', disabledClass: 'submission-disabled' },
		message: '',
        progressMessage: 'Processing...',
        type: 'submit'
    };

	constructor(props: Props): void {
        super(props);
        this.state = { messageInProgress: props.messageInProgress };
    }

	onSubmit(event: SyntheticEvent<HTMLButtonElement>) {
		super.onSubmit(event);
	}

	render(): Node {
		const { className, dataClass, message, progressMessage, ...rest } = this.props;
		const { progressClass, errorClass, disabledClass, ...restClass } = dataClass;
		rest.message = this.state.store.submissionInProgress ? progressMessage : message;
		rest.className = classes(
			className,
			progressClass && this.state.store.submissionInProgress,
			errorClass && this.state.store.error,
			disabledClass && this.state.store.disabled
    	);
		rest.dataClass = restClass;
    	this.props = rest;
    	return super.render();
	}
};
