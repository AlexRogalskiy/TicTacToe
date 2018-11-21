'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';

import CellElement from 'app-root/components/elements/cell.element';

// @flow
type Props = {
	cells: array,
	player: string,
	winCells: array,
	onSetCell: func
};
type Cell = number;

export default class GridElement extends Component<Props> {
  displayName: string = 'GridElement';

  static defaultProps: Props = {
	className: 'grid',
	cells: [],
	winCells: [],
	onSetCell: Function.prototype
  };
  
  constructor(props: Props): void {
    super(props);
	this.isWinnerCell = this.isWinnerCell.bind(this);
  }
  
  isWinnerCell(cell: Cell): bool {
	  return (this.props.winCells && this.props.winCells.includes(cell));
  }
  
  render(): Node {
    const { cells, player, winCells, onSetCell, ...rest } = this.props;
    return (
      <div {...rest}>
        {cells.map((value, cell) => (
          <CellElement
            key={cell}
            state={value}
            isWinner={this.isWinnerCell(cell)}
            onPress={e => onSetCell({ cell, cells, player })}
          />
        ))}
      </div>
    );
  }
};
