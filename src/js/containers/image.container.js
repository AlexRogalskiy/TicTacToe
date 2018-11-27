'use strict';

/**
 * Module dependencies
 */
import { push } from 'connected-react-router';
import { connect } from 'react-redux';

import {
  requestImage,
  requestImageSuccess,
  requestImageError,
  fetchImage
} from 'actions/image.action';
import ImageWidget from 'components/widgets/image.widget';
import type { ImageState, ImageInfo, ImageData, Dispatch } from 'types/image.type';

type DispatchInfo = {
	onFetchImage: func;
};

const mapStateToProps = (state: ImageState): ImageInfo => ({
	//pathname: state.router.pathname,
	//search: state.router.location.search,
	//hash: state.router.location,
	router: state.router,
	image: state.image
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchInfo => ({
	onFetchImage: (data: ImageData): void  => {
		//dispatch({type: 'USER_FETCH_REQUESTED', payload: {userId}})
		dispatch(fetchImage(data));
		
		//dispatch(push('/home'))
		
		/*dispatch(requestImage());
		return fetch(url)
			.then(res => res.json())
			.then(
				(data: ImageData) => dispatch(requestImageSuccess(data)),
				(err: Object<any>) => dispatch(requestImageError(err))
			);*/
	}
});

const ImageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ImageWidget);

/*const ImageContainer = connect((state: ImageState): ImageState => {
	return state;
})(ImageWidget);*/

export default ImageContainer;