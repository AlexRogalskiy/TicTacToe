'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';

import Logger from 'app-root/libs/logger.lib';
import { isFunction } from 'app-root/libs/helpers.lib';

export default function MapperWrapper<PropsInput: {}, PropsOutput: {}>(mapperFn: (PropsInput) => PropsOutput): (React.ComponentType<PropsOutput>) => React.ComponentType<PropsInput> {
  return Component => {
    //
  };
}
