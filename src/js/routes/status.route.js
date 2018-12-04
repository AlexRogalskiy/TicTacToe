'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
import { Route } from 'react-router-dom';

/* @flow */
type Props = {
	code: number;
	children?: Node;
};

const StatusRoute = ({ code, children }: Props): Node => (
  <Route
    render={({ staticContext }) => {
      if (staticContext) staticContext.status = code;
      return children;
    }}
  />
);

export default StatusRoute;