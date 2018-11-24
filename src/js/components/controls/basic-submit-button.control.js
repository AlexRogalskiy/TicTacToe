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
//import Logger     from 'js/mixins/logger';
import BasicButtonControl from 'components/controls/basic-button.control';
//import BasicSubmitButtonStyle from 'css/components/controls/basicSubmitButtonControl';
//let Styles = ClassNames.bind(BasicSubmitButtonStyle);

/* @flow */
type Store = {
	messageInProgress?: string;
	submissionInProgress?: boolean;
	error?: boolean;
	disabled?: boolean;
	onSubmit?: func;
};
type Props = {
	dataClass?: Object<any>;
	message?: string;
	progressMessage?: string;
};
type State = {
	store: Object<Store>;
};

export default class BasicSubmitButtonControl extends BasicButtonControl {
	displayName: string = 'BasicSubmitButtonControl';

	state: State = {
		store: {
			messageInProgress: null,
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
		this.onSubmit = this.onSubmit.bind(this);
        this.state = { messageInProgress: props.messageInProgress };
    }

	onSubmit(event: SyntheticEvent<HTMLButtonElement>): func {
		return super.onClick(event);
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
