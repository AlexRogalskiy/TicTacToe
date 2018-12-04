'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
import { renderRoutes } from 'react-router-config';

import { Elements } from 'libs/elements.lib';

/* @flow */
type Props = {
	route: Object<any>;
	match: Object<any>;
	location: Object<any>;
};

const ItemView = ({ route, match, location }: Props): Node => (
	<Elements.Head_3>
		Requested Param: {match.params.id}
		{ renderRoutes(route.routes, { someProp: "these extra props are optional" }) }
	</Elements.Head_3>
);

export default ItemView;