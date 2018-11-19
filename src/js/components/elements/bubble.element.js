'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
//import PropTypes from 'prop-types';
import { style, classes } from 'typestyle';

type Props = {
	children?: React.Node
};

export default class BubbleElement extends Component<Props> {
	displayName: string = 'BlockFadeTransition';
	
	static defaultProps: Props = {
		className: 'bubble',
		inline: true
    };
	
	render(): Node {
		const { className, children, ...rest } = this.props;
		return (
			<blockquote className={className} {...rest}>
				{children}
			</blockquote>
		);
	}
};

