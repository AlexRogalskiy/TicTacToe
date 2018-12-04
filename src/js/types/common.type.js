'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';

/* @flow */
export type Dictionary<K,T> = {
	[key: K]: T
};

export type RouteItem = {
	path: string;
	component?: React.ComponentType<Props>;
	routes?: Array<RouteItem>;
	loadData?: func;
};

export type LinkItem = {
	path: string;
	title?: string;
};

export type NavLinkItem = {
	path: string;
	title?: string;
	className?: string;
};
