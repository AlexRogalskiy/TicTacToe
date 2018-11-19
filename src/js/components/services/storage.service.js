'use strict';

export default class StorageService {
  displayName: string = 'StorageService';
  
  storage: object;

  constructor(storage: object): void {
    this.storage = storage;
  }
  
  get(key: object): object {
	  return this.storage.getItem(key);
  }
  
  set(key: object, value: object): void {
	  this.storage.setItem(key, value);
  }
};