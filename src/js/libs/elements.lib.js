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
//styled('div');
const Styled = (component: string) => {
	return React.createClass({
		displayName: component,

		render(): Node {
			const { style, ...rest } = this.props;
			if (Array.isArray(style)) {
				style = Object.assign({}, ...style);
			}
			return (<component style={polyfill(style)} {...rest} />);
		}
	});
};

export {
	MessageList,
	Message,
	Input,
	Styled
};