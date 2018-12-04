'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
import { polyfill } from 'libs/helpers.lib';

/* @flow */
type Props = {
	style: Object<any>;
};

export default function StylerWrapper<Props: {}>(WrappedComponent: React.ComponentType<Props>): React.ComponentType<Props> {
	
	return class extends Component<Props> {
		displayName: string = 'StylerWrapper';
	  
		static defaultProps: Props = {
			style: {}
		};
	
		render(): Node {
			const { style, ...rest } = this.props;
			if (Array.isArray(style)) {
				this.style = Object.assign({}, ...style);
			}
			return (<WrappedComponent wrappedComponentRef={c => (this.component = c)} style={polyfill(style)} {...rest} />);
		}
	}
};