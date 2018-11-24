'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';

import CellElement from 'components/elements/cell.element';
import type { Player, Cells, Position } from 'types/tictactoe.type';
import { Elements } from 'libs/elements.lib';

/* @flow */
type Props = {
	player: Player;
	cells: Cells;
	winCells: Cells;
	onSetCell: func;
};

export default class GridElement extends Component<Props> {
  displayName: string = 'GridElement';
  
  static defaultProps: Props = {
	className: 'grid',
	player: '',
	cells: [],
	winCells: [],
	onSetCell: Function.prototype
  };
  
  constructor(props: Props): void {
    super(props);
	this.isWinner = this.isWinner.bind(this);
  }
  
  isWinner(position: Position): boolean {
	  return (this.props.winCells && this.props.winCells.includes(position));
  }
  
  render(): Node {
    const { cells, player, winCells, onSetCell, ...rest } = this.props;
    return (
      <Elements.View {...rest}>
        {cells.map((cell, position) => (
          <CellElement
            key={position}
            value={cell}
            isWinner={this.isWinner(position)}
            onPress={onSetCell({ position, cells, player })}
          />
        ))}
      </Elements.View>
    );
  }
};
