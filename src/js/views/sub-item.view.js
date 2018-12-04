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

const SubItemView = ({ route, match, location }: Props): Node => (
	<Elements.Head_5>
		Requested Param: {match.params.id}
	</Elements.Head_5>
);

export default SubItemView;