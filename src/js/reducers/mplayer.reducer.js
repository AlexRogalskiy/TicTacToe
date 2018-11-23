'use strict';

/**
 * Module dependencies
 */
import { PLAY, PAUSE, STOP, BACKWARD, FORWARD, UPDATE_TIME, SELECT_TRACK } from 'app-root/constants/mplayer.constant';
import type { MTrack, MPlayerAction, MPlayerState } from 'app-root/types/mplayer.type';

const initialState: MPlayerState = {
	tracks: {},
	currentTrackId: null,
	currentTime: 0,
	playing: false
};

const getNextTrackId = (tracks: Dictonary<MTrack, number>, currentTrackId: number): number => {
	const trackIds = Object.keys(tracks);
	const nextTrackIndex = trackIds.indexOf(currentTrackId) + 1;
	if (nextTrackIndex >= tracks.length) {
		nextTrackIndex = 0;
	}
	return tracksIds[nextTrackIndex];
};

const getPreviousTrackId = (tracks: Dictonary<MTrack, number>, currentTrackId: number): number => {
	const trackIds = Object.keys(tracks);
	const nextTrackIndex = trackIds.indexOf(currentTrackId) - 1;
	if (nextTrackIndex < 0) {
		nextTrackIndex = trackIds.length - 1;
	}
	return trackIds[nextTrackIndex];
};

const MPlayerReducer = (state: MPlayerState = initialState, action: MPlayerAction = {}): MPlayerState => {
	switch (action.type) {
		case PLAY:
			return {
				...state,
				playing: true
			};
		case PAUSE:
			return {
				...state,
				playing: false
			};
		case STOP:
			return {
				...state,
				playing: false,
				currentTime: 0
			};
		case BACKWARD:
			return {
				...state,
				currentTime: 0,
				currentTrackId: getPreviousTrackId(state.tracks, state.currentTrackId)
			};
		case FORWARD:
			return {
				...state,
				currentTime: 0,
				currentTrackId: getNextTrackId(state.tracks, state.currentTrackId)
			};
		case UPDATE_TIME:
			return {
				...state,
				currentTime: action.currentTime
			};
		case SELECT_TRACK:
			return {
				...state,
				currentTime: 0,
				currentTrackId: action.track.id
			};
		default:
			return state;
	}
};

export default MPlayerReducer;