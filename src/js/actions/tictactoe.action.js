'use strict';

/**
 * Module dependencies
 */
import { ADD_MOVE, RESET, START, INITIALIZE, FINALIZE } from 'app-root/constants/tictactoe.constant';

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

const addMove = (data: Data) => {
  return {
    type: ADD_MOVE,
    cell: data.cell,
    player: data.player
  };
};

const resetGame = (data: Data) => {
  return {
    type: RESET,
    room: data.room,
  };
};

const startGame = (board: Board, player: Player) => {
  return {
    type: START,
    board,
    player
  };
};

const initializeGame = (data: Data) => {
  return {
    type: INITIALIZE,
    board: data.board,
    cells: data.cells,
    player: data.player,
    room: data.room,
  };
};

const finalizeGame = (data: Data) => {
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