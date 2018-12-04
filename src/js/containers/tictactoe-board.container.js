'use strict';

/**
 * Module dependencies
 */
import { connect } from 'react-redux';
import LocalizedStrings from 'react-localization';
//import { Dispatch } from 'redux';
//import { RouteComponentProps } from 'react-router';

import {
  addMove,
  resetGame,
  startGame,
  initializeGame,
  finalizeGame,
} from 'actions/tictactoe.action';
import BoardWidget from 'components/widgets/board.widget';

import type { Data, State, Board, Player, Cells, Cell, Position, Dispatch } from 'types/tictactoe.type';
import { isNullOrUndefined } from 'libs/helpers.lib';
import Locale from 'resources/i18n/locale';

const localStrings = new LocalizedStrings(Locale);

/* @flow */
type GameState = {
	winner?: string;
	winningState?: Cells;
};
type BoardInfo = {
    id: string;
	message?: string;
    title?: string;
    date?: string;
};
type StateInfo = {
	router: Object<any>;
    player: Player;
    cells: Cells;
    board: BoardInfo;
    winCells: Cells;
    roundFinished: boolean;
    message: string;
};
type DispatchProps = {
	onSetCell: (data: Data) => void;
	onReset: (data: Data) => void;
	onStart: (data: Data) => void;
	onInitialize: (data: Data) => void;
	onFinalize: (data: Data) => void;
};

const getWinner = (cells: Cells): GameState => {
  const winningStates = [
    // Horizontal lines
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // Diagonal lines
    [0, 4, 8],
    [2, 4, 6],
    // Vertical lines
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
  ];

  let currentState = {};
  winningStates.forEach(winningState => {
    const potentialWinner = cells[winningState[0]];
    if (!isNullOrUndefined(potentialWinner)) {
      var hasWonCurrentState = true;
      winningState.forEach(winningCell => {
        if (cells[winningCell] !== potentialWinner) {
          hasWonCurrentState = false;
        }
      });
      if (hasWonCurrentState) {
        currentState.winner = potentialWinner;
        currentState.winningState = winningState;
      }
    }
  });
  return currentState;
};

const isTie = (cells: Cells): boolean => {
  if (!isNullOrUndefined(getWinner(cells).winner)) {
    return false;
  }
  let isTie = true;
  cells.forEach(cell => {
    if (isNullOrUndefined(cell)) {
      isTie = false;
    }
  });
  return isTie;
};

const isFinished = (cells: Cells): boolean => {
  return !isNullOrUndefined(getWinner(cells).winner) || isTie(cells);
};

const isValidMove = (cells: Cells, position: Position): boolean => {
  // cannot put marker if the cell is not free
  if (!isNullOrUndefined(cells[position])) {
    return false;
  }
  // cannot make a move if the game is over
  return !isFinished(cells);
};

const getBoard = (board: Board): BoardInfo => {
  return {
    message: localStrings.formatString(
      localStrings.board,
      board.title,
      board.id,
      board.date
    ),
    title: board.title,
    id: board.id,
    date: board.date,
  };
};

const getStatusMessage = (cells: Cells, player: Player): string => {
  if (isTie(cells)) {
    return localStrings.tie;
  }
  const winner = getWinner(cells).winner;
  if (!isNullOrUndefined(winner)) {
    return localStrings.formatString(localStrings.winner, winner);
  }
  return localStrings.formatString(localStrings.player, player);
};

const mapStateToProps = (state: State): StateInfo => ({
	//pathname: state.router.pathname,
	//search: state.router.location.search,
	//hash: state.router.location.hash,
	router: state.router,
    player: state.game.player,
    cells: state.game.cells,
    board: getBoard(state.game.board),
    winCells: getWinner(state.game.cells).winningState,
    roundFinished: isFinished(state.game.cells),
    message: getStatusMessage(state.game.cells, state.game.player),
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    onSetCell: (data: Data) => {
      if (isValidMove(data.cells, data.position)) {
        dispatch(addMove(data));
      }
    },
    onReset: (data: Data) => dispatch(resetGame(data)),
    onStart: (data: Data) => dispatch(startGame(data)),
    onInitialize: (data: Data) => dispatch(initializeGame(data)),
    onFinalize: (data: Data) => dispatch(finalizeGame(data))
});

const TicTacToeBoardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(BoardWidget);

export default TicTacToeBoardContainer;
