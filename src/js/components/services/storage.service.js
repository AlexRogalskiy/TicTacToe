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

  constructor(props: Props): void {
    this.storage = props.storage;
  }
  
  get(key: Object<any>): Object<any> {
	  return this.storage.getItem(key);
  }
  
  set(key: Object<any>, value: Object<any>): void {
	  this.storage.setItem(key, value);
  }
};
