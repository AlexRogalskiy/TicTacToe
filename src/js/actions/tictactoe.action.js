'use strict';

/**
 * Module dependencies
 */
import { ADD_MOVE, RESET, START, INITIALIZE, FINALIZE } from 'constants/tictactoe.constant';
import type { Data, Action } from 'types/tictactoe.type';

export const addMove = (data: Data): Action => ({
  //let response = await fetch(...);
    type: ADD_MOVE,
    position: data.position,
    player: data.player
});

export const resetGame = (data: Data): Action => ({
  //let response = await fetch(...);
    type: RESET,
    room: data.room
});

export const startGame = (data: Data): Action => ({
  //let response = await fetch(...);
    type: START,
    board: data.board,
	cells: data.cells,
    player: data.player,
	room: data.room
});

export const initializeGame = (data: Data): Action => ({
  //let response = await fetch(...);
    type: INITIALIZE,
    board: data.board,
    cells: data.cells,
    player: data.player,
    room: data.room
});

export const finalizeGame = (data: Data): Action => ({
  //let response = await fetch(...);
    type: FINALIZE,
    room: data.room
});
