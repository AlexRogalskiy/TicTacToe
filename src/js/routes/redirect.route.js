'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
import { Redirect } from 'react-router';

/* @flow */
type Props = {
	match: Object<any>;
};

const RedirectRoute = ({ match }: Props): Node => (
	<Redirect to={`${match.path}/${match.params}`} />
);

export default RedirectRoute;