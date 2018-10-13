'use strict';

/**
 * Module dependencies
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TableHead from 'app-root/components/elements/table-head';
import TableRow from 'app-root/components/elements/table-row';

export default class Table extends Component {
  get displayName() {
    return 'Table';
  }
  
  static get propTypes() {
    return {
      data: PropTypes.object
    };
  }

  static get defaultProps() {
    return {
      className: 'table',
      data: { headers: {}, rows: {}}
    };
  }

  render() {
    const { className, data, ...rest } = this.props;
	return (
			<table className={className} {...rest}>
				<thead>
					<TableHead data={data.headers} />
				</thead>
				<tbody>
					<TableRow data={data.rows} />
				</tbody>
			</table>
	);
  }
};