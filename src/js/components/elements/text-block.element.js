'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
//import PropTypes from 'prop-types';

type Props = {
	content?: string
};

export default class TextBlockElement extends Component<Props> {
  displayName: string = 'TextBlockElement';

  static defaultProps: Props =  {
      className: 'text-block',
      content: null
  };

  render(): Node {
    const { className, content, ...rest } = this.props;
    return (
		<span className={className} {...rest}>{ content }</span>
    );
  }
};