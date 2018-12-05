'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
import { Elements } from 'libs/elements.lib';
import Animated from 'animated/lib/targets/react-dom';

import { Elements } from 'libs/elements.lib';

/* @flow */
type Props = {
	children?: Node;
};
type State = {
	anim?: Object<any>;
};

export default class Animated11Element extends Component<Props, State> {
  displayName: string = 'Animated11Element';

  view: ?HTMLElement;

  state: State = {
	  anim: new Animated.Value(0)
  };
  
  handleClick(): void {
	Animated.timing(this.state.anim, {toValue: 400}).start();
  }
	
  render(): Node {
    return (
      <Animated.div
        style={{left: this.state.anim}}
        className="circle"
        onClick={this.handleClick}>
        Click
      </Animated.div>
    );
  }
};