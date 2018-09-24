"use strict";

/**
 * Module dependencies
 */
import { connect } from 'react-redux';
import LocalizedStrings from 'react-localization';

import { addMove, resetGame } from '../actions/index';
import Board from '../components/board';

import { isNullOrUndefined } from '../libs/helpers';
import Locale from '../resources/locale';

const localStrings = new LocalizedStrings(Locale);

const getWinner = (cells) => {
    const winningStates = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 4, 8],
        [2, 4, 6],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8]
    ];

    var winner = null;
    winningStates.forEach((winningState) => {
        const potentialWinner = cells[winningState[0]];
        if (!isNullOrUndefined(potentialWinner)) {
            var hasWonCurrentState = true;
            winningState.forEach((winningCell) => {
                if (cells[winningCell] !== potentialWinner) {
					hasWonCurrentState = false;
				}
            });
            if (hasWonCurrentState) {
				winner = potentialWinner;
			}
        }
    });
    return winner;
};

const isTie = (cells) => {
    if (!isNullOrUndefined(getWinner(cells))) {
		return false;
	}
    var isTie = true;
    cells.forEach((cell) => {
        if (isNullOrUndefined(cell)) {
			isTie = false;
		}
    });
    return isTie;
};

const isValidMove = (cells, cell) => {
    // Invalid move when the cell is not free
    if (!isNullOrUndefined(cells[cell])) {
		return false;
	}
    // Do not update when the game is over
    if (!isNullOrUndefined(getWinner(cells)) || isTie(cells)) {
		return false;
	}
    return true;
};

const getStatusMessage = (cells, player) => {
    if (isTie(cells)) {
		return localStrings.tie;
	}
    const winner = getWinner(cells);
    if (!isNullOrUndefined(winner)) {
        return localStrings.formatString(localStrings.winner, winner);
    }
	return localStrings.formatString(localStrings.player, player);
};

const mapStateToProps = (state) => {
    return {
        player: state['player'],
        cells: state['cells'],
        message: getStatusMessage(state['cells'], state['player'])
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSetCell: (cell, cells, player) => {
            if (isValidMove(cells, cell)) {
				dispatch(addMove(cell, player));
			}
        },
        onReset: () => {
            dispatch(resetGame());
        }
    }
};

const TicTacToeBoard = connect(mapStateToProps, mapDispatchToProps)(Board);

export default TicTacToeBoard;