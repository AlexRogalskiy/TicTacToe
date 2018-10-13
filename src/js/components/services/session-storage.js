'use strict';

export default class SessionStorage {
  get displayName() {
    return 'SessionStorage';
  }

  constructor() {
    super(sessionStorage);
  }
};
