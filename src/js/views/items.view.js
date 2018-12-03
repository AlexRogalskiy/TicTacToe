'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
import { Route, Link } from 'react-router-dom';

import { Elements } from 'libs/elements.lib';
import ItemView from 'views/item.view';

const ItemsView = ({ route, match }): Node => (
  <Elements.View>
    <Elements.Head_2>Items</Elements.Head_2>
    <Elements.List>
      <Elements.ListItem>
        <Link to={`${match.url}/components`}>Components</Link>
      </Elements.ListItem>
      <Elements.ListItem>
        <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
      </Elements.ListItem>
    </Elements.List>

    <Route path={`${match.path}/:id(\\d+)`} component={ItemView} />
    <Route path={match.path} render={() => <Elements.Head_3>Please select an item.</Elements.Head_3>} exact />
  </Elements.View>
);

export default ItemsView;