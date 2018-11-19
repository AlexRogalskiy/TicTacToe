'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';

import CellElement from 'app-root/components/elements/cell.element';

type Props = {
	cells: array,
	player: string,
	winCells: array,
	onSetCell: func
};

export default class GridElement extends Component<Props> {
  displayName: string = 'GridElement';

  static defaultProps: Props = {
	className: 'grid'
  };
  
  isWinnerCell(cell: number): bool {
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
            isWinner={isWinnerCell(cell)}
            onPress={e => onSetCell({ cell, cells, player })}
          />
        ))}
      </div>
    );
  }
};
