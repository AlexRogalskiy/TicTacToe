'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
//import PropTypes from 'prop-types';
import { style, classes } from 'typestyle';

import TextControl from 'components/controls/text.control';
import { Elements } from 'libs/elements.lib';

/* @flow */
type Props = {
	dataClass?: Object<any>;
	image?: Object<ImageInfo>;
	onFetchImage?: func;
	children?: Node;
};
type State = {
	disabled: boolean;
};

const DEFAULT_FETCH_URL: string = 'https://dog.ceo/api/breeds/image/random';

export default class ImageWidget extends Component<Props, State> {
	displayName: string = 'ImageWidget';
		
	view: ?HTMLElement;

	static defaultProps: Props = {
      className: 'image',
	  dataClass: {},
	  image: {}
	};
	
	state: State = {
		isDisabled: false
	};
	
	componentDidMount(): void {
		//this.props.dispatch(makeASandwichWithSecretSauce(this.props.forPerson));
		this.props.onFetchImage({ url: DEFAULT_FETCH_URL });
	}

	componentDidUpdate(prevProps: Object<any>): void {
		if (prevProps.forPerson !== this.props.forPerson) {
			//this.props.dispatch(makeASandwichWithSecretSauce(this.props.forPerson));
			this.props.onFetchImage({ url: DEFAULT_FETCH_URL });
		}
	}
  
	render(): Node {
		const { className, dataClass, image, children, staticContext, onFetchImage,  ... rest } = this.props;
		return (
		  <Elements.View className={className} ref={view => (this.view = view)} disabled={this.state.isDisabled} {...rest}>
			<TextControl />
			<Elements.Button onClick={() => onFetchImage({ url: DEFAULT_FETCH_URL })}>Show Image</Elements.Button>
			  {image.loading 
				? <Elements.Paragraph>Loading...</Elements.Paragraph>
				: image.error
					? <Elements.Paragraph>Error {image.message}, try again</Elements.Paragraph>
					: <Elements.Paragraph><Elements.Image src={image.url}/></Elements.Paragraph>}
		  </Elements.View>
		)
	}
};

/*import { push } from 'connected-react-router'
// in component render:
<div onClick={() => {
  props.push('/home');
}}>login</div>
export default connect(null, { push })(Component);*/