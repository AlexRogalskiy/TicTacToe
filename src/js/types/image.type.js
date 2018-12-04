'use strict';

/**
 * Module dependencies
 */
import { RouterState } from 'connected-react-router';

/* @flow */
export type Dispatch = (action: ImageAction | Promise<ImageAction>) => Promise;

export type ImageInfo = {
	router: RouterState;
	image: Object<ImageInfo>;
};

export type ImageState = {
	url?: string;
	loading?: boolean;
	error?: boolean;
	message?: string;
	router: RouterState;
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