'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';

import { Elements } from 'libs/elements.lib';

const SubItemView = ({ match }): Node => (
	<Elements.Head_5>
		Requested Param: {match.params.id}
	</Elements.Head_5>
);

export default SubItemView;