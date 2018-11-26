'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
//import PropTypes from 'prop-types';

import { Elements } from 'libs/elements.lib';

/* @flow */
type TableHeader = {
	id?: string;
	name?: string;
	ref?: string;
	className?: string;
	content?: Object<any>;
};
type Props = {
	 data: Array<TableHeader>;
};

export default class TableHeadElement extends Component<Props> {
  displayName: string = 'TableHeadElement';
  
  static defaultProps: Props = {
      className: 'table-head-row',
      data: []
  };
  
  getHeaders(data: Array<TableHeader> = []): Node {
	 return data.forEach((value, index) => {
		return (
			<Elements.THeadField key={index}
				item={value.key}
				id={value.id}
				name={value.name}
				ref={value.ref}
				className={value.className}>
				{value.content}
			</Elements.THeadField>
		);
	 });
  }

  render(): Node {
    const { className, data, ...rest } = this.props;
	return (
		<Elements.TRow className={className} {...rest}>
			{this.getHeaders(data)}
		</Elements.TRow>
	);
  }
};