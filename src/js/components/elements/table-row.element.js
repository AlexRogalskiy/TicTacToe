'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
//import PropTypes from 'prop-types';

type Props = {
	data: object
};

export default class TableRowElement extends Component<Props> {
  displayName: string = 'TableRowElement';

  static defaultProps: Props = {
      className: 'table-body-row',
      data: {}
  };
  
  getRows(data: object): Node {
	 return Object.keys(data).map((key, index) => {
		return (
			<td key={key} item={data[key]} id={data[key].id} name={data[key].name} ref={data[key].ref} className={data[key].className}>{data[key].content}</td>
		);
	 });
  }

  render(): Node {
    const { className, data, ...rest } = this.props;
	return (
			<tr className={className} {...rest}>
				{this.getRows(data)}
			</tr>
	);
  }
};