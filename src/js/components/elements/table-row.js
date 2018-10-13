'use strict';

/**
 * Module dependencies
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class TableRow extends Component {
  get displayName() {
    return 'TableRow';
  }
  
  static get propTypes() {
    return {
      data: PropTypes.object
    };
  }

  static get defaultProps() {
    return {
      className: 'table-body-row',
      data: {}
    };
  }
  
  getRows(data) {
	 return Object.keys(data).map((key, index) => {
		return (
			<td key={key} item={data[key]} id={data[key].id} name={data[key].name} ref={data[key].ref} className={data[key].className}>{data[key].content}</td>
		);
	 });
  }

  render() {
    const { className, data, ...rest } = this.props;
	return (
			<tr className={className} {...rest}>
				{this.getRows(data)}
			</tr>
	);
  }
};