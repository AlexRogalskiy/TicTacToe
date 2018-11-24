'use strict';

/**
 * Module dependencies
 */
import { connect } from 'react-redux';

import {
  requestImage,
  requestImageSuccess,
  requestImageError
} from 'actions/image.action';
import ImageWidget from 'components/widgets/image.widget';
import type { ImageState, ImageData, Dispatch } from 'types/image.type';

const mapStateToProps = (state: ImageState): ImageState => {
	return state;
};

const mapDispatchToProps = (dispatch: Dispatch): Object<any> => {
	return {
		onFetchImage: ({ url }) => {
			dispatch(requestImage());
			return fetch(url)
				.then(res => res.json())
				.then(
					(data: ImageData) => dispatch(requestImageSuccess(data)),
					(err: Object<any>) => dispatch(requestImageError())
				);
		}
	};
};

const ImageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ImageWidget);

/*const ImageContainer = connect((state: ImageState): ImageState => {
	return state;
})(ImageWidget);*/

export default ImageContainer;