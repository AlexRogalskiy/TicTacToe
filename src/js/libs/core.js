"use strict";

/**
 * returns current date
 */
Date.prototype.__defineGetter__('today', function () { 
	return ((this.getDate() < 10) ? '0' : '') + this.getDate() + '/' + (((this.getMonth()+1) < 10) ? '0' : '') + (this.getMonth()+1) + '/' + this.getFullYear();
});

/**
 * returns current time
 */
Date.prototype.__defineGetter__('timeNow', function () {
     return ((this.getHours() < 10) ? '0' : '') + this.getHours() + ':' + ((this.getMinutes() < 10) ? '0' : '') + this.getMinutes() + ':' + ((this.getSeconds() < 10) ? '0' : '') + this.getSeconds();
});

/**
 * returns lexical description of date/time
 */
Date.prototype.__defineGetter__('lexical', function() {
	var diff = (((new Date()).getTime() - this.getTime()) / 1000);
	var day_diff = Math.floor(diff / 86400);
	return 	day_diff == 0 &&
			diff < 60 && 'just now' ||
			diff < 120 && '1 minute ago' ||
			diff < 3600 && Math.floor(diff / 60) + ' minutes ago' ||
			diff < 7200 && '1 hour ago' ||
			diff < 86400 && Math.floor(diff / 3600) + " hours ago" ||
			day_diff == 1 && 'Yesterday' ||
			day_diff < 7 && day_diff + ' days ago' ||
			Math.ceil(day_diff / 7) + ' weeks ago';
});