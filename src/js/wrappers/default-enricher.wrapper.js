'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
//import PropTypes from 'prop-types';

import Logger from 'libs/logger.lib';

export default function DefaultEnricherWrapper<Props, Component: React.ComponentType<Props>>(WrappedComponent: Component): React.ComponentType<React.ElementConfig<Component>> {
	return function wrapper(props: Props): Node {
		return <WrappedComponent ref={c => (this.component = c)} {...props} />;
	};
};
