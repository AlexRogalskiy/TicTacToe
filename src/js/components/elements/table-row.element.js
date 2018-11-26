'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
//import PropTypes from 'prop-types';

import { Elements } from 'libs/elements.lib';

/* @flow */
type TableRow = {
	id?: string;
	name?: string;
	ref?: string;
	className?: string;
	content?: Object<any>;
};
type Props = {
	data: Array<TableRow>;
};

export default class TableRowElement extends Component<Props> {
  displayName: string = 'TableRowElement';

  static defaultProps: Props = {
      className: 'table-body-row',
      data: []
  };
  
  getRows(data: Array<TableRow> = []): Node {
	 return data.forEach((value, index) => {
		return (
			<Elements.TBodyField key={index}
			    item={value.key} 
				id=value.id}
				name=value.name}
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
				{this.getRows(data)}
			</Elements.TRow>
	);
  }
};