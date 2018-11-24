'use strict';

import React, { Component, Node } from 'react';
import { polyfill } from './helpers.lib';

/**
 * returns message block
 */
const MessageList = (props: object): Node => {
  const { messages, messageClass, ...rest } = props;
  if (messages && messages.length) {
    let elements = messages.map((item, index) => (
      <li key={index} className={messageClass}>
        {item}
      </li>
    ));
    return (<ul {...rest}>{ elements }</ul>);
  }
  return null;
};

/**
 * returns single message block
 */
const Message = (props: object): Node => {
  const { message, ...rest } = props;
  return (<div {...rest}>{ message }</div>);
};

/**
 * returns single input field
 */
const Input = (): func => {
	let InputField = ({ label, text, type, id, value, handleChange }): Node => (
		<div className="form-group">
			<label htmlFor={label}>{text}</label>
			<input
			  type={type}
			  className="form-control"
			  id={id}
			  value={value}
			  onChange={handleChange}
			  required
			/>
		</div>
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
	View: Styled('div'),
	Text: Styled('span'),
	Paragraph: Styled('p'),
	List: Styled('ul'),
	OrderedList: Styled('ol'),
	ListItem: Styled('li'),
	
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
	Section: Styled('section'),
	Article: Styled('article'),
	Aside: Styled('aside'),
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
	Stylesheets
};