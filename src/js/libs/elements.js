'use strict';

/**
 * returns message block
 */
export MessageList = (props) => {
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
export Message = (props) => {
  const { message, ...rest } = props;
  return <div {...rest}>{message}</div>;
};
