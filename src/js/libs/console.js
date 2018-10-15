'use strict';

/**
 * Module dependencies
 */
import { isNullOrUndefined } from './helpers';

const Console = ((globals: object) => {
	if (!globals.console) {
		globals.console = {};
	}
	const properties = ['memory'];
	const methods = ('assert,clear,count,debug,dir,dirxml,error,exception,group,' +
     'groupCollapsed,groupEnd,info,log,markTimeline,profile,profiles,profileEnd,' +
     'show,table,time,timeEnd,timeline,timelineEnd,timeStamp,trace,warn').split(',');
	
	while(let prop = properties.pop()) {
		if (!globals.console[prop]) {
			globals.console[prop] = {};
		}
	}
	while(let method = methods.pop()) {
		if (!globals.console[method]) {
			globals.console[method] = Function.prototype;
		}
	}
}(isNullOrUndefined(window) ? this : window));

export default Console;