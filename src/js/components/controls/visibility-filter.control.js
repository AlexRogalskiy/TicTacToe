// @flow

import React, { type Node } from 'react';
import PropTypes from 'prop-types'

export type Props = {
  active: boolean;
  children?: Node;
  onSetFilter: () => void;
  onResetFilter: () => void;
};

const LinkTodoControl = ({ active, children, onSetFilter }: Props) => {
	if (active) {
		return <span>{children}</span>;
	}
	return (
		<a // eslint-disable-line jsx-a11y/anchor-is-valid
		  href="#"
		  onClick={(event: Event) => {
			event.preventDefault();
			onSetFilter();
		  }}
		>
		  {children}
		</a>
	);
};

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
*/