'use strict';

/* @flow */
export type Dictionary<K,T> = {
	[key: K]: T
};

export type MTrack = {
	id: number;
	artistId: number;
	title: string;
	key: string;
	bucket: string;
};

export type MPlayerAction = {
	type: string;
	currentTime?: number;
	track?: MTrack;
};

export type MPlayerState = {
	tracks: Dictonary<number, MTrack>;
	currentTrackId: ?number;
	currentTime: number;
	playing: boolean;
};