'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
import Loadable from 'react-loadable';

const LoaderService = (source: string, Loading: React.ComponentType<Props>): Node => {
	return Loadable({
		loader: () => import(source),
		/*render(loaded, props) {
			let Component = loaded.namedExport;
			return <Component {...props}/>;
		},*/
		timeout: 10000,
		loading: Loading
	});
};

export default LoaderService;