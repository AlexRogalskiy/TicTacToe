'use strict';

/**
 * Module dependencies
 */
import { REQUESTED_IMAGE, REQUESTED_IMAGE_SUCCEEDED, REQUESTED_IMAGE_FAILED, FETCHED_IMAGE } from 'constants/image.constant';
import type { ImageData, ErrorData, ImageAction } from 'types/image.type';

const requestImage = (): ImageAction => {
	return {
		type: REQUESTED_IMAGE
	};
};

const requestImageSuccess = (data: ImageData): ImageAction => {
	return {
		type: REQUESTED_IMAGE_SUCCEEDED,
		url: data.message
	};
};

const requestImageError = (error: ErrorData): ImageAction => {
	return {
		type: REQUESTED_IMAGE_FAILED,
		message: error
	};
};

const fetchImage = (data: ImageData): ImageAction => {
	return {
		type: FETCHED_IMAGE,
		url: data.url
	};
};

export {
	requestImage,
	requestImageSuccess,
	requestImageError,
	fetchImage
};