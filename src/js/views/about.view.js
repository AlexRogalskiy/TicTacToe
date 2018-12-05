'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';

import { Elements } from 'libs/elements.lib';

/* @flow */
type Props = {
	route: Object<any>;
	match: Object<{
		path?: string;
		strict?: boolean;
		exact?: boolean;
	}>;
	location: Object<{
		key?: string;
		pathname?: string;
		search?: string;
		hash?: string;
		state?: Object<any>;
	}>;
};

const AboutView = ({ route, match, location }: Props): Node => (
	// location = { pathname: '/here', ... }
	<Elements.Head_2>
		About
	</Elements.Head_2>
);

/*AboutView.defaultProps = {
  defaultPathname: '/',
};*/

export default AboutView;