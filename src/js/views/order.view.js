'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
import { renderRoutes } from 'react-router-config';

import { Elements } from 'libs/elements.lib';
//import { matchPath } from "react-router";

/*const match = matchPath("/users/123", {
  path: "/users/:id",
  exact: true,
  strict: false
});*/

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

const OrderView = ({ route, match, location }: Props): Node => (
    <Elements.View>
      <Elements.Head_3>Only asc/desc are allowed: {match.params.direction}</Elements.Head_3>
    </Elements.View>
);

export default OrderView;