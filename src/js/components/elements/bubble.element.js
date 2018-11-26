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
	inline?: boolean;
	children?: Node;
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
			<Elements.Quote className={className} {...rest}>
				{children}
			</Elements.Quote>
		);
	}
};

