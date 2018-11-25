'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
import StatusRoute from 'app-root/routes/status.route';

const NotFoundView = (): Node => (
  <StatusRoute code={404}>
    <div>
      <h1>Sorry, can’t find that.</h1>
    </div>
  </StatusRoute>
);

export default NotFoundView;