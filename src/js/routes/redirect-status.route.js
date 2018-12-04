'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
import { Redirect } from 'react-router';
import { Route } from 'react-router-dom';

/* @flow */
type Props = {
	from: string;
	to: string;
	status: number;
};

const RedirectStatusRoute = ({ from, to, status }: Props): Node => (
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