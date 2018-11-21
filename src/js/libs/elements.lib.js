'use strict';

import React, { Component, Node } from 'react';
import { polyfill } from './helpers.lib';

/**
 * returns message block
 */
const MessageList = (props: object) => {
  const { messages, messageClass, ...rest } = props;
  if (messages && messages.length) {
    let elements = messages.map((item, index) => (
      <li key={index} className={messageClass}>
        {item}
      </li>
    ));
    return (<ul {...rest}>{elements}</ul>);
  }
  return null;
};

/**
 * returns single message block
 */
const Message = (props: object) => {
  const { message, ...rest } = props;
  return (<div {...rest}>{ message }</div>);
};

/**
 * returns single input field
 */
const Input = () => {
	let InputField = ({ label, text, type, id, value, handleChange }) => (
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
const Styled = (StyledComponent: string) => {
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
const View = Styled('div');
const Text = Styled('span');
const Image = Styled('img');
const Stylesheets = { create: (s) => s };

/**
 * wrapped html elements set
 */
const Elements = {
	View,
	Text,
	Image
};

export {
	MessageList,
	Message,
	Input,
	Elements,
	Stylesheets
};