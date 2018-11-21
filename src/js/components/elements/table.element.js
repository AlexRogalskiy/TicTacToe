'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
//import PropTypes from 'prop-types';

import TableHeadElement from 'app-root/components/elements/table-head.element';
import TableRowElement from 'app-root/components/elements/table-row.element';

// @flow
type TableHeader = {
	id?: string,
	name?: string,
	ref?: string,
	className?: string,
	content?: Object<any>
};
type TableRow = {
	id?: string,
	name?: sring,
	ref?: string,
	className?: string,
	content?: Object<any>
};
type Props = {
	data: Object<{
		headers: Array<TableHeader>,
		rows: Array<TableRow>
	}>
};

export default class TableElement extends Component<Props> {
  displayName: string = 'TableElement';

  static defaultProps: Props = {
      className: 'table',
      data: { headers: [], rows: [] }
  };

  render(): Node {
    const { className, data, ...rest } = this.props;
	return (
			<table className={className} {...rest}>
				<thead>
					<TableHeadElement data={data.headers} />
				</thead>
				<tbody>
					<TableRowElement data={data.rows} />
				</tbody>
			</table>
	);
  }
};