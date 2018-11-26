'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
//import PropTypes from 'prop-types';

import TableHeadElement from 'components/elements/table-head.element';
import TableRowElement from 'components/elements/table-row.element';

import { Elements } from 'libs/elements.lib';

/* @flow */
type TableHeader = {
	id?: string;
	name?: string;
	ref?: string;
	className?: string;
	content?: Object<any>;
};
type TableRow = {
	id?: string;
	name?: sring;
	ref?: string;
	className?: string;
	content?: Object<any>;
};
type Props = {
	data: Object<{
		headers: Array<TableHeader>;
		rows: Array<TableRow>;
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
			<Elements.Table className={className} {...rest}>
				<Elements.THead>
					<TableHeadElement data={data.headers} />
				</Elements.THead>
				<Elements.TBody>
					<TableRowElement data={data.rows} />
				</Elements.TBody>
			</Elements.Table>
	);
  }
};