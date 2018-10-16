'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
//import PropTypes from 'prop-types';

import TableHead from 'app-root/components/elements/table-head';
import TableRow from 'app-root/components/elements/table-row';

type Props = {
	data: object
};

export default class Table extends Component<Props> {
  displayName: string = 'Table';

  static defaultProps: Props = {
      className: 'table',
      data: { headers: {}, rows: {}}
  };

  render(): Node {
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