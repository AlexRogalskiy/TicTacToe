'use strict';

/* @flow */
export type Player = string;
export type Cells = Array<string>;
export type Cell = number;

export type Data = {
	board?: Board;
	cell?: Cell;
	cells?: Cells;
	player?: Player;
	room?: string;
};

export type Action = BoardAction | CellsAction | PlayerAction;

export type Board = {
	title: string;
	id: string;
	date: string;
};

export type BoardState = {
	title: string,
	id: string,
	date: string
};
export type BoardAction = {
	type: string
};

export type CellsState = Array<string>;
export type CellsAction = {
	type: string,
	cell?: number,
	player?: string
};

export type PlayerState = string;
export type PlayerAction = {
	type: string
};