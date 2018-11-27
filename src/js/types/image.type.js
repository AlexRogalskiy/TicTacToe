'use strict';

/* @flow */
export type Dispatch = (action: ImageAction | Promise<ImageAction>) => Promise;

export type ImageInfo = {
	url?: string;
	loading?: boolean;
	error?: boolean;
	message?: string;
};

export type ImageState = {
	router: Object<any>;
	image: Object<ImageInfo>;
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