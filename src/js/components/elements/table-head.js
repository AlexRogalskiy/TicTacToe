'use strict';

/**
 * Module dependencies
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TableHead extends Component {
  get displayName() {
    return 'TableHead';
  }
  
  static get propTypes() {
    return {
      data: PropTypes.object
    };
  }

  static get defaultProps() {
    return {
      className: 'table-head-row',
      data: {}
    };
  }
  
  getHeaders(data) {
	 return Object.keys(data).map((key, index) => {
		return (
			<th key={key} item={data[key]} id={data[key].id} name={data[key].name} ref={data[key].ref} className={data[key].className}>{data[key].content}</th>
		);
	 });
  }

  render() {
    const { className, data, ...rest } = this.props;
	return (
		<tr className={className} {...rest}>
			{this.getHeaders(data)}
		</tr>
	);
  }
}

export default TableHead;
