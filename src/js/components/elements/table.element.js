'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
//import PropTypes from 'prop-types';

import TableHeadElement from 'app-root/components/elements/table-head.element';
import TableRowElement from 'app-root/components/elements/table-row.element';

type Props = {
	data: object
};

export default class TableElement extends Component<Props> {
  displayName: string = 'TableElement';

  static defaultProps: Props = {
      className: 'table',
      data: { headers: {}, rows: {} }
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