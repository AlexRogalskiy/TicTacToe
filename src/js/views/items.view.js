'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
import { Route } from 'react-router-dom';

import ItemView from 'views/item.view';

const ItemsView = ({ match }): Node => (
  <div>
    <h2>Items</h2>
    <ul>
      <li>
        <Link to={`${match.url}/components`}>Components</Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
      </li>
    </ul>

    <Route path={`${match.path}/:id`} component={ItemView} />
    <Route path={match.path} render={() => <h3>Please select an item.</h3>} exact />
  </div>
);

export default ItemsView;