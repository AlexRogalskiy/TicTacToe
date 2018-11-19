'use strict';

export default class SessionStorageService {
  displayName: string = 'SessionStorageService';

  constructor(props: Props): void {
    super(sessionStorage);
  }
};
