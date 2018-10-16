'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
//import PropTypes from 'prop-types';

type Props = {
	 data: object
};

export default class TableHead extends Component<Props> {
  displayName: string = 'TableHead';
  
  static defaultProps: Props = {
      className: 'table-head-row',
      data: {}
  };
  
  getHeaders(data: object): Node {
	 return Object.keys(data).map((key, index) => {
		return (
			<th key={key} item={data[key]} id={data[key].id} name={data[key].name} ref={data[key].ref} className={data[key].className}>{data[key].content}</th>
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