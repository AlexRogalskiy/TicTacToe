"use strict";

/**
 * Module dependencies
 */
import { ADD_MOVE, RESET, START, INITIALIZE, FINALIZE } from '../constants/action-types';

export const addMove = (cell, player) => {
    return {
        type: ADD_MOVE,
        cell,
        player
    };
};

export const resetGame = () => {
    return {
        type: RESET
    };
};

export const startGame = (board, player) => {
    return {
        type: START,
		board,
		player
    };
};

export const initializeGame = (board, cells, player) => {
    return {
        type: INITIALIZE,
		board,
		cells,
		player
    };
};

export const finalizeGame = (board, cells, player) => {
    return {
        type: FINALIZE,
		board,
		cells,
		player
    };
};