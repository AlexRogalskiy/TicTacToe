'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
//import PropTypes from 'prop-types';
import { RouteComponentProps } from 'react-router';
import { style, classes } from 'typestyle';

import 'jest-dom/extend-expect';
import {render, fireEvent, cleanup} from 'react-testing-library';

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

test('can render with redux with defaults', () => {
  const {getByTestId, getByText, unmount, container} = renderWithRedux(
    <ConnectedCounter />,
  )
  fireEvent.click(getByText('+'))
  expect(getByTestId('count-value')).toHaveTextContent('1')
})

test('can render with redux with custom initial state', () => {
  const {getByTestId, getByText, unmount, container} = renderWithRedux(
    <ConnectedCounter />,
    {
      initialState: {count: 3},
    },
  )
  fireEvent.click(getByText('-'))
  expect(getByTestId('count-value')).toHaveTextContent('2')
})

test('can render with redux with custom store', () => {
  // this is a silly store that can never be changed
  const store = createStore(() => ({count: 1000}))
  const {getByTestId, getByText, container, unmount} = renderWithRedux(
    <ConnectedCounter />,
    {
      store,
    },
  )
  fireEvent.click(getByText('+'))
  expect(getByTestId('count-value')).toHaveTextContent('1000')
  fireEvent.click(getByText('-'))
  expect(getByTestId('count-value')).toHaveTextContent('1000')
})
