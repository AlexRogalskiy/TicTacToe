'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';

import { Elements } from 'libs/elements.lib';
import StatusRoute from 'app-root/routes/status.route';

const NoMatchView = (): Node => (
  <StatusRoute code={404}>
    <Elements.View>
      <Elements.Head_1>Sorry, can’t find that.</Elements.Head_1>
    </Elements.View>
  </StatusRoute>
);

export default NoMatchView;