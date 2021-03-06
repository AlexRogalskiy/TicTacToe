'use strict';

/**
 * Module dependencies
 */
import Logger from './logger.lib';

export default class EventEmitter {
  displayName: string = 'EventEmitter';
	
  listeners: array = [];
  
    on(cb: func): func {
        this.listeners.push(cb)
        return () => {
            const index = this.listeners.indexOf(cb);
            if (index !== -1) {
				this.listeners.splice(index, 1);
			}
        }
    }

    emit(data: Object<any>): void {
        this.listeners.forEach(fn => fn(data));
    }
};
