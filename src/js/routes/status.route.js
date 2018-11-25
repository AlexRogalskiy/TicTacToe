'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
import { Route } from 'react-router-dom';

const StatusRoute = ({ code, children }): Node => (
  <Route
    render={({ staticContext }) => {
      if (staticContext) staticContext.status = code;
      return children;
    }}
  />
);

export default StatusRoute;