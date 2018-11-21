'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
//import PropTypes from 'prop-types';

// @flow
type TableHeader = {
	id?: string,
	name?: string,
	ref?: string,
	className?: string,
	content?: Object<any>
};
type Props = {
	 data: Array<TableHeader>
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
			<th key={index}
				item={value.key}
				id={value.id}
				name={value.name}
				ref={value.ref}
				className={value.className}>
				{value.content}
			</th>
		);
	 });
  }

  render(): Node {
    const { className, data, ...rest } = this.props;
	return (
		<tr className={className} {...rest}>
			{this.getHeaders(data)}
		</tr>
	);
  }
};