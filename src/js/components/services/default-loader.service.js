'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
import Loadable from 'react-loadable';

import LoaderElement from 'components/elements/loader.element';

const DefaultLoaderService = (opts) => {
	return Loadable(Object.assign({
			loading: LoaderElement,
			delay: 200,
			timeout: 10,
		}, opts)
	);
};

export default DefaultLoaderService;