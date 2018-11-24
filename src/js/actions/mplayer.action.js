'use strict';

/**
 * Module dependencies
 */
import { PLAY, PAUSE, STOP, BACKWARD, FORWARD, UPDATE_TIME, SELECT_TRACK } from 'constants/mplayer.constant';
import type { MTrack, MPlayerAction } from 'types/mplayer.type';

const play = (): MPlayerAction => {
	return {
		type: PLAY
	};
};

const pause = (): MPlayerAction => {
	return {
		type: PAUSE
	};
};

const stop = (): MPlayerAction => {
	return {
		type: STOP
	};
};

const backward = (): MPlayerAction => {
	return {
		type: BACKWARD
	};
};

const forward = (): MPlayerAction => {
	return {
		type: FORWARD
	};
};

const updateTime = (currentTime: number): MPlayerAction => {
	return {
		type: UPDATE_TIME,
		currentTime
	};
};

const selectTrack = (track: MTrack): MPlayerAction => {
	return {
		type: SELECT_TRACK,
		track
	};
};

export {
	play,
	pause,
	stop,
	backward,
	forward,
	updateTime,
	selectTrack
};