'use strict';

/**
 * Module dependencies
 */
import { connect } from 'react-redux';
import LocalizedStrings from 'react-localization';

import {
  addMove,
  resetGame,
  startGame,
  initializeGame,
  finalizeGame,
} from 'app-root/actions/tictactoe.action';
import BoardWidget from 'app-root/components/widgets/board.widget';

import { isNullOrUndefined } from 'app-root/libs/helpers.lib';
import Locale from 'app-root/resources/i18n/locale';

const localStrings = new LocalizedStrings(Locale);

// @flow
type Data = {
	board?: Board,
	cell?: Cell,
	cells?: Cells,
	player?: Player,
	room?: string
};
type Player = string;
type Cells = Array<string>;
type Cell = number;
type Board = {
	title: string,
	id: string,
	date: string
};
type State = {
	PlayerReducer: Player,
	CellsReducer: Cells,
	BoardReducer: Board
};

const getWinner = (cells: Cells) => {
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

  let currentState = { winner: null, winningState: null };
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

const isTie = (cells: Cells) => {
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

const isFinished = (cells: Cells) => {
  return !isNullOrUndefined(getWinner(cells).winner) || isTie(cells);
};

const isValidMove = (cells: Cells, cell: Cell) => {
  // cannot put marker if the cell is not free
  if (!isNullOrUndefined(cells[cell])) {
    return false;
  }
  // cannot make a move if the game is over
  return !isFinished(cells);
};

const getBoard = (board: Board) => {
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

const getStatusMessage = (cells: Cells, player: Player) => {
  if (isTie(cells)) {
    return localStrings.tie;
  }
  const winner = getWinner(cells).winner;
  if (!isNullOrUndefined(winner)) {
    return localStrings.formatString(localStrings.winner, winner);
  }
  return localStrings.formatString(localStrings.player, player);
};

const mapStateToProps = (state: State) => {
  return {
    player: state.PlayerReducer,
    cells: state.CellsReducer,
    board: getBoard(state.BoardReducer),
    winCells: getWinner(state.CellsReducer).winningState,
    roundFinished: isFinished(state.CellsReducer),
    message: getStatusMessage(state.CellsReducer, state.PlayerReducer),
  };
};

const mapDispatchToProps = (dispatch: func) => {
  return {
    onSetCell: (data: Data) => {
      if (isValidMove(data.cells, data.cell)) {
        dispatch(addMove(data));
      }
    },
    onReset: (data: Data) => {
      dispatch(resetGame(data));
    },
    onStart: (board: Board, player: Player) => {
      dispatch(startGame(board, player));
    },
    onInitialize: (data: Data) => {
      dispatch(initializeGame(data));
    },
    onFinalize: (data: Data) => {
      dispatch(finalizeGame(data));
    },
  };
};

const TicTacToeBoardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(BoardWidget);

export default TicTacToeBoardContainer;
