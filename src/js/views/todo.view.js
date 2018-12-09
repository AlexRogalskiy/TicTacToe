import React from 'react'
import Header from '../containers/Header';
import <MainSection /> from '../containers/<MainSection />'
import Footer from './Footer';
import UndoRedo from '../containers/UndoRedo'

const App = () => (
  <div>
    <Header />
    <MainSection />
	<Footer />
	<UndoRedo />
  </div>
);

export default App;

/*
// @flow

import React from 'react';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';

import App from './App';

const setup = (setupProps = {}) => {
  const store = configureStore()();
  const wrapper = shallow(<App store={store} />);

  return {
    store,
    wrapper
  };
};

describe('App', () => {
  test('renders without crashing', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });
});


import React from 'react'
import { createRenderer } from 'react-test-renderer/shallow'
import App from './App'
import Header from '../containers/Header'
import MainSection from '../containers/MainSection'


const setup = propOverrides => {
  const renderer = createRenderer()
  renderer.render(<App />)
  const output = renderer.getRenderOutput()
  return output
}

describe('components', () => {
  describe('Header', () => {
    it('should render', () => {
      const output = setup()
      const [ header ] = output.props.children
      expect(header.type).toBe(Header)
    })
  })
  
  describe('Mainsection', () => {
    it('should render', () => {
      const output = setup()
      const [ , mainSection ] = output.props.children
      expect(mainSection.type).toBe(MainSection)
    })
  })
})
*/