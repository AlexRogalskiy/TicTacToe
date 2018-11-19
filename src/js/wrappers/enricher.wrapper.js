'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
//import PropTypes from 'prop-types';

import Logger from 'app-root/libs/logger.lib';

export default function EnricherWrapper<Props: {}>(Component: React.ComponentType<Props>): React.ComponentType<$Diff<Props, { name: string | void }>> {
	return function wrapper(props: Props) {
		return <Component {...props} name={'enricher'} />;
	};
};

/*
class MyComponent extends React.Component<{
  a: number,
  b: number,
  name: number,
}> {}

const MyEnhancedComponent = Enricher(MyComponent);

// We don't need to pass in `foo` even though `MyComponent` requires it.

<MyEnhancedComponent a={1} b={2} />;
*/