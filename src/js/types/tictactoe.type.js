'use strict';

/* @flow */
export type Player = string;
export type Position = number;
export type Cell = string;
export type Cells = Array<Cell>;

export type Data = {
	board?: Board;
	position?: Position;
	cells?: Cells;
	player?: Player;
	room?: string;
};

export type State = {
	router: Object<any>;
	game: Object<{
		board: Board,
		cells: Cells,
		player: Player
	}>;
};

export type Action = BoardAction | CellsAction | PlayerAction;

export type Dispatch = (action: Action | Promise<Action>) => Promise;

export type Board = {
	id: string;
	title?: string;
	date?: string;
};

export type BoardState = Board;

export type BoardAction = {
	type: string;
};

export type CellsState = Cells;

export type CellsAction = {
	type: string;
	position?: Position;
	player?: Player;
};

export type PlayerState = Player;

export type PlayerAction = {
	type: string;
};