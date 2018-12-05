'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
import { Elements } from 'libs/elements.lib';
import Animated, { HorizontalPan } from 'animated/lib/targets/react-dom';

import { Elements } from 'libs/elements.lib';

/* @flow */
type Props = {
	children?: Node;
};
type State = {
	anim?: Object<any>;
};

export default class Animated5Element extends Component<Props, State> {
  displayName: string = 'Animated5Element';

  view: ?HTMLElement;

  state: State = {
	  anim: new Animated.Value(0)
  };
	
  render(): Node {
    return (
      <Animated.div
		ref={view => (this.view = view)}
        style={{left: this.state.anim}}
        className="circle"
        {...HorizontalPan(this.state.anim)}>
        Drag
      </Animated.div>
    );
  }
};