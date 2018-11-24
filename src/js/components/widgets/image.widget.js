'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
//import PropTypes from 'prop-types';
import { style, classes } from 'typestyle';

import { Elements } from 'libs/elements.lib';

/* @flow */
type Props = {
	dataClass?: Object<any>;
	url?: string;
	loading?: boolean;
	error?: boolean;
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
	
	render(): Node {
		const { className, dataClass, loading, url, error, children, staticContext, onFetchImage,  ... rest } = this.props;
		return (
		  <Elements.View className={className} ref={view => (this.view = view)} disabled={this.state.isDisabled} {...rest}>
			<Elements.Button onClick={() => onFetchImage({ url: DEFAULT_FETCH_URL })}>Show Image</Elements.Button>
			  {loading 
				? <Elements.Paragraph>Loading...</Elements.Paragraph>
				: error
					? <Elements.Paragraph>Error, try again</Elements.Paragraph>
					: <Elements.Paragraph><Elements.Image src={url}/></Elements.Paragraph>}
		  </Elements.View>
		)
	}
};