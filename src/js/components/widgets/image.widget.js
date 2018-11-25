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
	url?: string;
	loading?: boolean;
	error?: boolean;
	message?: string;
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
	  loading: false,
	  error: false
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
		const { className, dataClass, url, loading, error, message, children, staticContext, onFetchImage,  ... rest } = this.props;
		return (
		  <Elements.View className={className} ref={view => (this.view = view)} disabled={this.state.isDisabled} {...rest}>
			<TextControl />
			<Elements.Button onClick={() => onFetchImage({ url: DEFAULT_FETCH_URL })}>Show Image</Elements.Button>
			  {loading 
				? <Elements.Paragraph>Loading...</Elements.Paragraph>
				: error
					? <Elements.Paragraph>Error {message}, try again</Elements.Paragraph>
					: <Elements.Paragraph><Elements.Image src={url}/></Elements.Paragraph>}
		  </Elements.View>
		)
	}
};