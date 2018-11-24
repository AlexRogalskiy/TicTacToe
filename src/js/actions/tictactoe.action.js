'use strict';

/**
 * Module dependencies
 */
import { ADD_MOVE, RESET, START, INITIALIZE, FINALIZE } from 'constants/tictactoe.constant';
import type { Data, Action } from 'types/tictactoe.type';

const addMove = (data: Data): Action => {
  //let response = await fetch(...);
  return {
    type: ADD_MOVE,
    position: data.position,
    player: data.player
  };
};

const resetGame = (data: Data): Action => {
  //let response = await fetch(...);
  return {
    type: RESET,
    room: data.room
  };
};

const startGame = (data: Data): Action => {
  //let response = await fetch(...);
  return {
    type: START,
    board: data.board,
	cells: data.cells,
    player: data.player,
	room: data.room
  };
};

const initializeGame = (data: Data): Action => {
  //let response = await fetch(...);
  return {
    type: INITIALIZE,
    board: data.board,
    cells: data.cells,
    player: data.player,
    room: data.room
  };
};

const finalizeGame = (data: Data): Action => {
  //let response = await fetch(...);
  return {
    type: FINALIZE,
    room: data.room
  };
};

export {
	addMove,
	resetGame,
	startGame,
	initializeGame,
	finalizeGame
};