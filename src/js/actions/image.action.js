'use strict';

/**
 * Module dependencies
 */
import { REQUESTED_IMAGE, REQUESTED_IMAGE_SUCCEEDED, REQUESTED_IMAGE_FAILED } from 'constants/image.constant';
import type { ImageData, ImageAction } from 'types/image.type';

const requestImage = (): ImageAction => {
	return {
		type: 'REQUESTED_IMAGE'
	};
};

const requestImageSuccess = (data: ImageData): ImageAction => {
	return {
		type: 'REQUESTED_IMAGE_SUCCEEDED',
		url: data.message
	};
};

const requestImageError = (): ImageAction => {
	return {
		type: 'REQUESTED_IMAGE_FAILED'
	};
};

export {
	requestImage,
	requestImageSuccess,
	requestImageError
};