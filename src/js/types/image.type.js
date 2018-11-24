'use strict';

/* @flow */
export type Dispatch = (action: ImageAction | Promise<ImageAction>) => Promise;

export type ImageState = {
	url?: string;
	loading: boolean;
	error: boolean;
};

export type ImageAction = {
	type: string;
	url?: string;
};

export type ImageData = {
	message?: string;
};