// @flow

import React from 'react';

import FilterLink from '../containers/FilterLink';

const FooterTodoControl = () => (
  <p>
    Show:
    {' '}
    <FilterLink filter="SHOW_ALL">
      All
    </FilterLink>
    {', '}
    <FilterLink filter="SHOW_ACTIVE">
      Active
    </FilterLink>
    {', '}
    <FilterLink filter="SHOW_COMPLETED">
      Completed
    </FilterLink>
  </p>
);

export default FooterTodoControl;

/*
// @flow

import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';

import Footer from './Footer';

const setup = (setupProps = {}) => {
  const store = configureStore()();
  const wrapper = shallow(<Footer store={store} />);

  return {
    store,
    wrapper
  };
};

describe('Footer', () => {
  test('renders without crashing', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });
});
*/