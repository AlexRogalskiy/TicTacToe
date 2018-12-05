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

export default class AnimatedElement extends Component<Props, State> {
  displayName: string = 'AnimatedElement';

  view: ?HTMLElement;

  state: State = {
	  anim: new Animated.Value(0)
  };
  
  click(): void {
    Animated.timing(this.state.anim, { 
      toValue: 100, 
      duration: 500 
    }).start();
  };

  render(): Node {
    return (
      <Elements.View ref={view => (this.view = view)} className='App'>
        <Animated.div
          className='box'
          style={{ left: this.state.anim }}
          onClick={this.click}
        />
      </Elements.View>
    );
  }
};