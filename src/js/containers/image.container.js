'use strict';

/**
 * Module dependencies
 */
//import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
//import { RouteComponentProps } from 'react-router';

import {
  requestImage,
  requestImageSuccess,
  requestImageError,
  fetchImage
} from 'actions/image.action';
import ImageWidget from 'components/widgets/image.widget';
import type { ImageState, ImageInfo, ImageData } from 'types/image.type';//Dispatch

type DispatchProps = {
	onFetchImage: (data: ImageData) => void;
};

const mapStateToProps = (state: ImageState): ImageInfo => ({
	//pathname: state.router.pathname,
	//search: state.router.location.search,
	//hash: state.router.location,
	router: state.router,
	image: state.image
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
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