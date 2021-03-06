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

const AppView = ({ route, match, location }: Props): Node => (
  <Elements.View>
    { renderRoutes(route.routes) }
  </Elements.View>
);

export default AppView;