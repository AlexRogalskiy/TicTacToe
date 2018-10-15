'use strict';

/**
 * Module dependencies
 */
import { ADD_MOVE, RESET, START, INITIALIZE, FINALIZE } from 'app-root/constants/tictactoe-constants';

const addMove = (cell: number, player: string) => {
  return {
    type: ADD_MOVE,
    cell,
    player,
  };
};

const resetGame = (data: object) => {
  return {
    type: RESET,
    room: data.room,
  };
};

const startGame = (board: object, player: string) => {
  return {
    type: START,
    board,
    player,
  };
};

const initializeGame = (data: object) => {
  return {
    type: INITIALIZE,
    board: data.board,
    cells: data.cells,
    player: data.player,
    room: data.room,
  };
};

const finalizeGame = (data: object) => {
  return {
    type: FINALIZE,
    board: data.board,
    cells: data.cells,
    player: data.player,
    room: data.room,
  };
};

export {
	addMove,
	resetGame,
	startGame,
	initializeGame,
	finalizeGame
};