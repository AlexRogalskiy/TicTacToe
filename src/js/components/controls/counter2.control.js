'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
//import PropTypes from 'prop-types';
import { RouteComponentProps } from 'react-router';
import { style, classes } from 'typestyle';

import { StateProps, DispatchProps } from 'types/counter.type';
import { Elements } from 'libs/elements.lib';
import Logger from 'libs/logger.lib';

const Counter2Control = (props: RouteComponentProps<any> & StateProps & DispatchProps) => (
  <Elements.View>
    Counter: {props.count}
    <Elements.Button onClick={props.onIncrement}>+</Elements.Button>
    <Elements.Button onClick={props.onDecrement}>-</Elements.Button>
  </Elements.View>
);

export default Counter2Control;