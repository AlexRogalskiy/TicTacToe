'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
//import PropTypes from 'prop-types';

import Logger from 'libs/logger.lib';

export default function EnricherWrapper<Props: {}>(Component: React.ComponentType<Props>): React.ComponentType<$Diff<Props, { name: string | void }>> {
	return function wrapper(props: Props): Node {
		return <Component wrappedComponentRef={c => (this.component = c)} {...props} name={'wrapper'} />;
	};
};

/*
class MyComponent extends Component<{
  a: number,
  b: number,
  name: string,
}> {}

const MyEnhancedComponent = EnricherWrapper(MyComponent);

// We don't need to pass in `foo` even though `MyComponent` requires it.

<MyEnhancedComponent a={1} b={2} />;
*/