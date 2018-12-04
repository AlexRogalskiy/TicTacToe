'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
import { renderRoutes } from 'react-router-config';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

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

const Data = [
  { id: 0, name: "Michelle", friends: [1, 2, 3] },
  { id: 1, name: "Sean", friends: [0, 3] },
  { id: 2, name: "Kim", friends: [0, 1, 3] },
  { id: 3, name: "David", friends: [1, 2] }
];

const find = (id: number): Object<any> => {
	return Data.find(p => p.id == id);
};

const RecursiveListView = ({ route, match, location }: Props): Node => {
	let person = find(match.params.id);
	return (
		<Elements.View>
			<Elements.Head_3>
				{person.name}
				’s Friends
			</Elements.Head_3>
			<Elements.List>
				{person.friends.map(id => (
				  <Elements.ListItem key={id}>
						<Link to={`${match.url}/${id}`}>{ find(id).name }</Link>
				  </Elements.ListItem>
				))}
			</Elements.List>
			<Route path={`${match.url}/:id`} component={RecursiveListView} />
		</Elements.View>
	);
};

const RecursiveView = (): Node => {
  return (
	{// <Router> }
	<RecursiveListView match={{ params: { id: 0 }, url: "" }} />
	{//  </Router> }
  );
};

export default RecursiveView;