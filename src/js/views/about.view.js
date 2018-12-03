'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
import { Elements } from 'libs/elements.lib';

const AboutView = ({ route, location }): Node => (
	// location = { pathname: '/here', ... }
	<Elements.Head_2>
		About
	</Elements.Head_2>
);

export default AboutView;