'use strict';

/**
 * Module dependencies
 */
import { REQUESTED_IMAGE, REQUESTED_IMAGE_SUCCEEDED, REQUESTED_IMAGE_FAILED } from 'constants/image.constant';
import type { ImageState, ImageAction } from 'types/image.type';

const initialState: ImageState = {
	url: '',
	loading: false,
	error: false,
};

const ImageReducer = (state: ImageState = initialState, action: ImageAction = {}): ImageState => {
	switch(action.type) {
		case REQUESTED_IMAGE:
		  return {
			url: '',
			loading: true,
			error: false,
		  };
		case REQUESTED_IMAGE_SUCCEEDED:
		  return {
			url: action.url,
			loading: false,
			error: false,
		  };
		case REQUESTED_IMAGE_FAILED:
		  return {
			url: '',
			loading: false,
			error: true,
		  };
		default:
		  return state;
	}
};

export default ImageReducer;