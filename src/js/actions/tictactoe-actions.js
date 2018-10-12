'use strict';

/**
 * Module dependencies
 */
import {
  ADD_MOVE,
  RESET,
  START,
  INITIALIZE,
  FINALIZE,
} from 'app-root/constants/tictactoe-constants';

export const addMove = (cell, player) => {
  return {
    type: ADD_MOVE,
    cell,
    player,
  };
};

export const resetGame = data => {
  return {
    type: RESET,
    room: data.room,
  };
};

export const startGame = (board, player) => {
  return {
    type: START,
    board,
    player,
  };
};

export const initializeGame = data => {
  return {
    type: INITIALIZE,
    board: data.board,
    cells: data.cells,
    player: data.player,
    room: data.room,
  };
};

export const finalizeGame = data => {
  return {
    type: FINALIZE,
    board: data.board,
    cells: data.cells,
    player: data.player,
    room: data.room,
  };
};
