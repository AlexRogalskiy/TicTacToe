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
  //let response = await fetch(...);
  return {
    type: ADD_MOVE,
    cell: data.cell,
    player: data.player
  };
};

const resetGame = (data: Data) => {
  //let response = await fetch(...);
  return {
    type: RESET,
    room: data.room
  };
};

const startGame = (data: Data) => {
  //let response = await fetch(...);
  return {
    type: START,
    board: data.board,
	cells: data.cells,
    player: data.player,
	room: data.room
  };
};

const initializeGame = (data: Data) => {
  //let response = await fetch(...);
  return {
    type: INITIALIZE,
    board: data.board,
    cells: data.cells,
    player: data.player,
    room: data.room
  };
};

const finalizeGame = (data: Data) => {
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