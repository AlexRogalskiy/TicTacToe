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

const SubItemView = ({ route, match, location }: Props): Node => (
	<React.Fragment>
		<Elements.Head_5>
			Requested Param: {match.params.id}
		</Elements.Head_5>
	</React.Fragment>
);

export default SubItemView;