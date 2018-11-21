'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
import { polyfill } from 'app-root/libs/helpers.lib';

export default function StylerWrapper<Props: {}>(WrappedComponent: React.ComponentType<Props>): React.ComponentType<Props> {
	
	return class extends Component<Props, State> {
		displayName: string = 'StylerWrapper';
	  
		render(): Node {
			const { style, ...rest } = this.props;
			if (Array.isArray(style)) {
				style = Object.assign({}, ...style);
			}
			return (<WrappedComponent style={polyfill(style)} {...rest} />);
		}
	}
};