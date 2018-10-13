'use strict';

/**
 * Module dependencies
 */
import { ADD_MOVE, RESET, START, INITIALIZE, FINALIZE } from 'app-root/constants/tictactoe-constants';

const addMove = (cell, player) => {
  return {
    type: ADD_MOVE,
    cell,
    player,
  };
};

const resetGame = (data) => {
  return {
    type: RESET,
    room: data.room,
  };
};

const startGame = (board, player) => {
  return {
    type: START,
    board,
    player,
  };
};

const initializeGame = (data) => {
  return {
    type: INITIALIZE,
    board: data.board,
    cells: data.cells,
    player: data.player,
    room: data.room,
  };
};

const finalizeGame = (data) => {
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