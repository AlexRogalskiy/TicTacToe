'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
//import PropTypes from 'prop-types';

import Logger from 'app-root/libs/logger';

export default function injectProps<Props: {}>(Component: React.ComponentType<Props>): React.ComponentType<$Diff<Props, { name: string | void }>> {
	return function WrapperComponent(props: Props) {
		return <Component {...props} name={'injector'} />;
	};
};

/*
class MyComponent extends React.Component<{
  a: number,
  b: number,
  name: number,
}> {}

const MyEnhancedComponent = injectProps(MyComponent);

// We don't need to pass in `foo` even though `MyComponent` requires it.

<MyEnhancedComponent a={1} b={2} />;
*/