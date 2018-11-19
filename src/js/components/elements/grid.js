'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';

import Cell from 'app-root/components/elements/cell';

type Props = {};

export default class Grid extends Component<Props> {
  displayName: string = 'Grid';

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
          <Cell
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
