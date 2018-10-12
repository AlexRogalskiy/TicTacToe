'use strict';

/**
 * Module dependencies
 */
import React, { Component } from 'react';

import Cell from 'app-root/components/elements/cell';

class Grid extends Component {
  get displayName() {
    return 'Grid';
  }

  static get defaultProps() {
    return {
      className: 'grid'
    };
  }
  
  isWinnerCell(cell) {
	  return (this.props.winCells && this.props.winCells.includes(cell) ? true : false);
  }
  
  render() {
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
}

export default Grid;
