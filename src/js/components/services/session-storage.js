'use strict';

export default class SessionStorage {
  displayName: string = 'SessionStorage';

  constructor(props: Props): void {
    super(sessionStorage);
  }
};
