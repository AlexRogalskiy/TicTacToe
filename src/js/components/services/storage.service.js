'use strict';

/* @flow */
type Props = {
	storage: Object<any>;
};

export default class StorageService<Props> {
  displayName: string = 'StorageService';
  
  static defaultProps: Props = {
      storage: {}
  };

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
