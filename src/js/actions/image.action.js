'use strict';

/**
 * Module dependencies
 */
import { REQUESTED_IMAGE, REQUESTED_IMAGE_SUCCEEDED, REQUESTED_IMAGE_FAILED, FETCHED_IMAGE } from 'constants/image.constant';
import type { ImageData, ErrorData, ImageAction } from 'types/image.type';

export const requestImage = (): ImageAction => ({
	type: REQUESTED_IMAGE
});

export const requestImageSuccess = (data: ImageData): ImageAction => ({
	type: REQUESTED_IMAGE_SUCCEEDED,
	url: data.message
});

export const requestImageError = (error: ErrorData): ImageAction => ({
	type: REQUESTED_IMAGE_FAILED,
	message: error
});

export const fetchImage = (data: ImageData): ImageAction => ({
	type: FETCHED_IMAGE,
	url: data.url
});
