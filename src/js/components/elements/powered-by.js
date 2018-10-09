'use strict';

/**
 * Module dependencies
 */
import React, { Component } from 'react';
import packageJSON from '../../../package.json';

class PoweredBy extends Component {
	get displayName() {
		return 'PoweredBy';
	}
	
	render() {
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

export default PoweredBy;