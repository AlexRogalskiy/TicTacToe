'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
//import PropTypes from 'prop-types';

import Logger from 'libs/logger.lib';

export default function InputWrapper<Props: {}>(Component: React.ComponentType<Props>): React.ComponentType<$Diff<Props, { name: string | void }>> {
	const forwardRef = (props: Props, ref: Object<any>): Node => {
		return <Component ref={ref} name={'wrapper'} {...props} />;
	};
	return React.forwardRef(forwardRef);
};