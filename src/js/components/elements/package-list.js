'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
import packageJSON from 'app-root/../package.json';

type Props = {};

export default class PackageGist extends Component<Props> {
	displayName: string = 'PackageGist';
 
	render(): Node {
		let deps = Object.keys(packageJSON.dependencies).map((dep, i) => <li key={i}>{dep}</li>);
		let devDeps = Object.keys(packageJSON.devDependencies).map((dep, i) => <li key={i + 10}>{dep}</li>);
		return (
			<div>
				<h2>Powered by</h2>
				<ul>
					{[...deps, ...devDeps]}
				</ul>
			</div>
		);
	}
};