'use strict';

/**
 * Module dependencies
 */
import { PLAY, PAUSE, STOP, BACKWARD, FORWARD, UPDATE_TIME, SELECT_TRACK } from 'app-root/constants/mplayer.constant';
import type { MTrack, MPlayerAction } from 'app-root/types/mplayer.type';

export function play() : MPlayerAction {
	return {
		type: PLAY
	};
};

export function pause(): MPlayerAction {
	return {
		type: PAUSE
	};
};

export function stop(): MPlayerAction {
	return {
		type: STOP
	};
};

export function backward(): MPlayerAction {
	return {
		type: BACKWARD
	};
};

export function forward(): MPlayerAction {
	return {
		type: FORWARD
	};
};

export function updateTime(currentTime: number): MPlayerAction {
	return {
		type: UPDATE_TIME,
		currentTime
	};
};

export function selectTrack(track: MTrack): MPlayerAction {
	return {
		type: SELECT_TRACK,
		track
	};
};