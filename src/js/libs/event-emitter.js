'use strict';

export default class EventEmitter {
  listeners: array = [];
	  
  displayName: string = 'EventEmitter';
  
    on(cb: func): void {
        this.listeners.push(cb)
        return () => {
            const index = this.listeners.indexOf(cb);
            if (index !== -1) {
				this.listeners.splice(index, 1);
			}
        }
    }

    emit(data: object): void {
        this.listeners.forEach(fn => fn(data));
    }
};