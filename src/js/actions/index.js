"use strict";

/**
 * Module dependencies
 */
import { ADD_MOVE, RESET } from '../constants/action-types';

export const addMove = (cell, player) => {
    return {
        type: ADD_MOVE,
        cell: cell,
        player: player
    };
};

export const resetGame = () => {
    return {
        type: RESET
    };
};