'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';

/* @flow */
export type Dictionary<K,T> = {
	[key: K]: T
};

export type Routes = {
	path: string;
	component?: React.ComponentType<Props>;
	loadData?: func;
};