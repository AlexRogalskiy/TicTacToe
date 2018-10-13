'use strict';

export default class Storage {
  get displayName() {
    return 'Storage';
  }

  constructor(storage) {
    this.storage = storage;
  }
  
  get(key) {
	  return this.storage.getItem(key);
  }
  
  set(key, value) {
	  this.storage.setItem(key, value);
  }
};
