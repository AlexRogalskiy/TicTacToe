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

export default class Animated2Element extends Component<Props, State> {
  displayName: string = 'Animated2Element';

  view: ?HTMLElement;

  state: State = {
	  anim: new Animated.Value(1)
  };
  
  handleMouseDown(): void {
	  Animated.timing(this.state.anim, { toValue: 0.5 }).start();
  }
  
  handleMouseUp(): void {
	  Animated.timing(this.state.anim, { toValue: 1 }).start();
  }
	
  render(): Node {
    return (
      <Elements.View ref={view => (this.view = view)} className='App'>
        <Animated.div
          className="box"
          style={{ transform: [{ scale: this.state.anim }] }}
          onMouseDown={this.handleMouseDown}
          onMouseUp={this.handleMouseUp}
        />
      </Elements.View>
    );
  }
};