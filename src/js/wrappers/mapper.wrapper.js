'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';

import Logger from 'libs/logger.lib';
import { isFunction } from 'libs/helpers.lib';

export default function MapperWrapper<PropsInput: {}, PropsOutput: {}>(mapper: (PropsInput) => PropsOutput): (React.ComponentType<PropsOutput>) => React.ComponentType<PropsInput> {
	//return Component => {
	//};
	return function wrapper(props: Props): Node {
		return <Component ref={c => (this.component = c)} {...props} />;
	};
}
