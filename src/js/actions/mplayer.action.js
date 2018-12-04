'use strict';

/**
 * Module dependencies
 */
import { PLAY, PAUSE, STOP, BACKWARD, FORWARD, UPDATE_TIME, SELECT_TRACK } from 'constants/mplayer.constant';
import type { MTrack, MPlayerAction } from 'types/mplayer.type';

export const play = (): MPlayerAction => ({
	type: PLAY
});

export const pause = (): MPlayerAction => ({
	type: PAUSE
});

export const stop = (): MPlayerAction => ({
	type: STOP
});

export const backward = (): MPlayerAction => ({
	type: BACKWARD
});

export const forward = (): MPlayerAction => ({
	type: FORWARD
});

export const updateTime = (currentTime: number): MPlayerAction => ({
	type: UPDATE_TIME,
	currentTime
});

export const selectTrack = (track: MTrack): MPlayerAction => ({
	type: SELECT_TRACK,
	track
});
