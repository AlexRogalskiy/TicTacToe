'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
//import PropTypes from 'prop-types';

import Logger from 'app-root/libs/logger';

export default function injectProps<Props, Component: React.ComponentType<Props>>(WrappedComponent: Component): React.ComponentType<React.ElementConfig<Component>> {
	return props => <WrappedComponent {...props} />;
};
