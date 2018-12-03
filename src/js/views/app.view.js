'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
import { renderRoutes } from 'react-router-config';

import { Elements } from 'libs/elements.lib';

const AppView = ({ route }): Node => (
  <Elements.View>
    { renderRoutes(route.routes) }
  </Elements.View>
);

export default AppView;