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

const OrderView = ({ route, match, location }: Props): Node => (
    <Elements.View>
      <Elements.Head_3>Only asc/desc are allowed: {match.params.direction}</Elements.Head_3>
    </Elements.View>
);

export default OrderView;