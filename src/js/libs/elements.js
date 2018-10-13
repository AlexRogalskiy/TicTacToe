'use strict';

/**
 * returns message block
 */
const MessageList = (props) => {
  const { messages, messageClass, ...rest } = props;
  if (messages && messages.length) {
    let elements = messages.map((item, index) => (
      <li key={index} className={messageClass}>
        {item}
      </li>
    ));
    return <ul {...rest}>{elements}</ul>;
  }
  return null;
};

/**
 * returns single message block
 */
const Message = (props) => {
  const { message, ...rest } = props;
  return <div {...rest}>{message}</div>;
};

/**
 * returns single input field
 */
const Input = {
	const InputField = ({ label, text, type, id, value, handleChange }) => (
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

export {
	MessageList,
	Message,
	Input
};