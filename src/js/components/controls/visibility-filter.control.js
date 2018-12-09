// @flow

import React, { type Node } from 'react';
import PropTypes from 'prop-types'
import classnames from 'classnames'

export type Props = {
  active: boolean;
  children?: Node;
  onSetFilter: () => void;
  onResetFilter: () => void;
};

const LinkTodoControl = ({ active, children, onSetFilter }: Props) => {
	return (
		<a // eslint-disable-line jsx-a11y/anchor-is-valid
		  href="#"
		  className={classnames({ selected: active })}
		  style={{ cursor: 'pointer' }}
		  onClick={(event: Event) => {
			event.preventDefault();
			onSetFilter();
		  }}
		>
		  {children}
		</a>
	);
};

Link.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  setFilter: PropTypes.func.isRequired
}


export default LinkTodoControl;

/*
// @flow

import React from 'react';
import { shallow } from 'enzyme';

import Link from './Link';

const setup = (setupProps = {}) => {
  const defaultProps = {
    active: false,
    onClick: jest.fn(),
    children: 'Test link'
  };
  const props = { ...defaultProps, ...setupProps };
  const wrapper = shallow(
    <Link active={props.active} onClick={props.onClick}>
      {props.children}
    </Link>
  );

  return {
    props,
    wrapper
  };
};

describe('Link', () => {
  test('renders without crashing', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });

  test('renders a span when active is true', () => {
    const { wrapper } = setup({ active: true });
    expect(wrapper).toMatchSnapshot();
  });

  test('calls onClick() on click', () => {
    const preventDefault = jest.fn();
    const { props, wrapper } = setup();
    expect(wrapper).toMatchSnapshot();

    const link = wrapper.find('a');
    link.simulate('click', { preventDefault });

    expect(props.onClick).toBeCalled();
    expect(preventDefault).toBeCalled();
  });
});


import React from 'react'
import { createRenderer } from 'react-test-renderer/shallow';
import Link from './Link'

const setup = (propOverrides) => {
  const props = Object.assign({
    active: false,
    children: 'All',
    setFilter: jest.fn()
  }, propOverrides)

  const renderer = createRenderer();
  renderer.render(<Link {...props} />)
  const output = renderer.getRenderOutput()

  return {
    props: props,
    output: output,
  }
}

describe('component', () => {
  describe('Link', () => {
    it('should render correctly', () => {
      const { output } = setup()
      expect(output.type).toBe('a')
      expect(output.props.style.cursor).toBe('pointer')
      expect(output.props.children).toBe('All')
    })

    it('should have class selected if active', () => {
      const { output } = setup({ active: true })
      expect(output.props.className).toBe('selected')
    })

    it('should call setFilter on click', () => {
      const { output, props } = setup()
      output.props.onClick()
      expect(props.setFilter).toBeCalled()
    })
  })
})
*/