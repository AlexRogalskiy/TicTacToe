'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
import { Redirect } from 'react-router';

const RedirectRoute = ({ match }): Node => (
	<Redirect to={`${match.path}/${match.params}`} />
);

export default RedirectRoute;