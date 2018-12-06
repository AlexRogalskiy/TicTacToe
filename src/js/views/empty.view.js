'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
import { Elements } from 'libs/elements.lib';

const EmptyView = (): Node => (
	<React.Fragment>
		<Elements.Head_2>
			Empty
		</Elements.Head_2>
	</React.Fragment>
);

export default EmptyView;