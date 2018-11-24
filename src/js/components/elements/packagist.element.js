'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
import packageJSON from 'app-root/../package.json';
import { Elements } from 'libs/elements.lib';

export default class PackagistElement extends Component<{}> {
	displayName: string = 'PackagistElement';
 
	render(): Node {
		let deps = Object.keys(packageJSON.dependencies).map((dep, i) => <li key={i}>{dep}</li>);
		let devDeps = Object.keys(packageJSON.devDependencies).map((dep, i) => <li key={i + 10}>{dep}</li>);
		return (
			<Elements.View>
				<Elements.Head_2>Powered by</Elements.Head_2>
				<Elements.List>
					{[...deps, ...devDeps]}
				</Elements.List>
			</Elements.View>
		);
	}
};