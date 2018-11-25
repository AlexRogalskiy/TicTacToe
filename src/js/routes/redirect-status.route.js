'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
import { Redirect } from 'react-router';
import { Route } from 'react-router-dom';

const RedirectStatusRoute = ({ from, to, status }): Node => (
  <Route
    render={({ staticContext }) => {
      // there is no `staticContext` on the client, so
      // we need to guard against that here
      if (staticContext) staticContext.status = status;
      return <Redirect from={from} to={to} />;
    }}
  />
);

export default RedirectStatusRoute;