'use strict';

/* @flow */
export type Dispatch = (action: ImageAction | Promise<ImageAction>) => Promise;

export type ImageState = {
	url?: string;
	loading: boolean;
	error: boolean;
	message?: string;
};

export type ImageAction = {
	type: string;
	url?: string;
	message?: string;
};

export type ErrorData = Object<any>;

export type ImageData = {
	url?: string;
	message?: string;
};