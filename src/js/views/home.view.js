'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
import { Elements } from 'libs/elements.lib';

/* @flow */
type Props = {
	route: Object<any>;
	match: Object<any>;
	location: Object<any>;
};
const HomeView = ({ route, match, location }: Props): Node => (
	<Elements.Head_2>
		Home
	</Elements.Head_2>
);

export default HomeView;