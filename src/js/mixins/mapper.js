'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';

import Logger from 'app-root/libs/logger';
import { isFunction } from 'app-root/libs/helpers';

export default function mapProps<PropsInput: {}, PropsOutput: {}>(mapperFn: (PropsInput) => PropsOutput): (React.ComponentType<PropsOutput>) => React.ComponentType<PropsInput> {
  return Component => {
    //
  };
}
