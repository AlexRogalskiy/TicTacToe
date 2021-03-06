'use strict';

import React, { Component, Node } from 'react';
import { BrowserRouter, Router, Route, Switch } from 'react-router-dom';
import { Link, NavLink } from "react-router-dom";
import classNames from 'classnames';

import { polyfill } from './helpers.lib';
import type { RouteItem, LinkItem, NavLinkItem } from 'types/common.type';

type Props = {
	children?: Node;
}

/**
 * returns message block
 */
const MessageList = (props: Object<any>): Node => {
  const { messages, messageClass, ...rest } = props;
  if (messages && messages.length) {
    let elements = messages.map((item, index) => (
      <Elements.ListItem key={index} className={messageClass}>
        {item}
      </Elements.ListItem>
    ));
    return (<Elements.List {...rest}>{ elements }</Elements.List>);
  }
  return null;
};

/**
 * returns container block
 */
const Container = (props: Object<any>): Node => {
	const { fluid, className, children, ...rest } = props;
	const _className = classNames({
		"container": !fluid,
		"container-fluid": fluid,
	}, 	className);
	return (
		<Elements.View className={_className} {...rest}>
			{children}
		</Elements.View>
	);
};

/**
 * returns row block
 */
const Row = (props: Object<any>): Node => {
	const { className, children, ...rest } = props;
	const _className = classNames("row", className);
	return (
		<Elements.View className={_className} {...rest}>
			{children}
		</Elements.View>
	);
};

/**
 * returns column block
 */
const Column = (props: Object<any>): Node => {
	const { size, className, children, ...rest } = props;
	const sizeClasses = (size || []).map((x) => { return `col-${x}`; }).join(' ');
	const _className = classNames(sizeClasses, className);
	return (
		<Elements.View className={_className} {...rest}>
			{children}
		</Elements.View>
	);
};

/**
 * returns single message block
 */
const Message = (props: object): Node => {
  const { message, ...rest } = props;
  return (<Elements.View {...rest}>{ message }</Elements.View>);
};

/**
 * returns single input field
 */
const Input = (): func => {
	let InputField = ({ label, text, type, id, value, handleChange }): Node => (
		<Elements.View className="form-group">
			<Elements.Label htmlFor={label}>{text}</Elements.Label>
			<Elements.Control
			  type={type}
			  className="form-control"
			  id={id}
			  value={value}
			  onChange={handleChange}
			  required
			/>
		</Elements.View>
	);
	InputField.propTypes = {
		label: PropTypes.string.isRequired,
		text: PropTypes.string.isRequired,
		type: PropTypes.string.isRequired,
		id: PropTypes.string.isRequired,
		value: PropTypes.string.isRequired,
		handleChange: PropTypes.func.isRequired,
	};
	return InputField;
};

/**
 * returns list of routes within switch block
 */
const renderRoutes = (routes: Array<RouteItem> = []): Node => (
  <Switch>
    {
		routes
		  .map((route, i) => (
			<Route key={i} {...route} />
		))
	}
  </Switch>
);

/**
 * returns list of links within block
 */
const renderLinks = (routes: Array<LinkItem> = []): Node => {
  let currentPath = window.location.pathname;
  return <Elements.List>
    {
      routes
        .map(({ path, title, ...rest }, i) =>
          <Elements.ListItem key={i}>
            <Link
			  key={i}
              to={`/${path}`}
              replace={path === currentPath}
			{...rest}>
              {title}
            </Link>
          </Elements.ListItem>
        )
    }
  </Elements.List>
};

/**
 * returns list of navlinks within block
 */
const renderNavLinks = (routes: Array<NavLinkItem> = []): Node => {
  let currentPath = window.location.pathname;
  return <Elements.List>
    {
      routes
        .map(({ path, title, className, ...rest }, i) =>
          <Elements.ListItem key={i}>
            <NavLink
			  key={i}
              to={`/${path}`}
              replace={path === currentPath}
			  activeClassName={className}
			{...rest}>
              {title}
            </NavLink>
          </Elements.ListItem>
        )
    }
  </Elements.List>
};

/**
 * returns styled component
 */
const Styled = (StyledComponent: string): Node => {
	return class extends Component<{style: Object<any>}> {
		displayName: StyledComponent;

		static defaultProps: Props = {
			style: {}
		};
		
		render(): Node {
			const { style, ...rest } = this.props;
			let styles = {};
			if (Array.isArray(style)) {
				styles = Object.assign({}, ...style);
			}
			return (<StyledComponent style={polyfill(styles)} {...rest} />);
		}
	};
};

/**
 * wrapped html elements
 */
const Elements = {
	Navigation: Styled('nav'),
	View: Styled('div'),
	Text: Styled('span'),
	Paragraph: Styled('p'),
	Link: Styled('a'),
	List: Styled('ul'),
	OrderedList: Styled('ol'),
	ListItem: Styled('li'),
	Quote: Styled('blockquote'),
	
	Head_1: Styled('h1'),
	Head_2: Styled('h2'),
	Head_3: Styled('h3'),
	Head_4: Styled('h4'),
	Head_5: Styled('h5'),
	Head_6: Styled('h6'),
	
	Canvas: Styled('canvas'),
	
	Form: Styled('form'),
	Button: Styled('button'),
	Selector: Styled('select'),
	Control: Styled('input'),
	ProgressBar: Styled('progress'),
	Counter: Styled('meter'),
	MultiLine: Styled('textarea'),
	
	Image: Styled('img'),
	Line: Styled('hr'),
	
	Label: Styled('label'),
	Table: Styled('table'),
	THead: Styled('thead'),
	TBody: Styled('tbody'),
	TRow: Styled('tr'),
	THeadField: Styled('th'),
	TBodyField: Styled('td'),
	Section: Styled('section'),
	Article: Styled('article'),
	Side: Styled('aside'),
	Header: Styled('header'),
	Footer: Styled('footer')
};

/**
 * wrapped stylesheets elements
 */
const Stylesheets = {
	create: (s: Object<any>): Object<any> => s
};

export {
	MessageList,
	Message,
	Input,
	Elements,
	Stylesheets,
	
	renderRoutes,
	renderLinks,
	renderNavLinks
};