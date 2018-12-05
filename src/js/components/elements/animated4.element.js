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

export default class Animated4Element extends Component<Props, State> {
  displayName: string = 'Animated4Element';

  view: ?HTMLElement;

  state: State = {
	  anim: new Animated.Value(0)
  };
  
  componentWillMount(): void {
    this.interpolate = this.state.anim.interpolate({
      inputRange: [0, 1],
      outputRange: ['260deg', '0deg']
    });
    this.interpolate.addListener(v => console.log(v));
  }
  
  handleClick(delta: number): void {
    this.state.anim.stopAnimation(value => {
      Animated.spring(this.state.anim, {
        toValue: Math.round(value) + delta
      }).start();
    });
  }
	
  render(): Node {
    return (
      <Elements.View ref={view => (this.view = view)}>
        <Elements.Button onClick={() => this.handleClick(-1)}>&lt;</Elements.Button>
        <Animated.div
          style={{
            transform: [
              {rotate: this.state.anim.interpolate({
                inputRange: [0, 4],
                outputRange: ['0deg', '360deg']
              })},
            ],
            position: 'relative'
          }}
          className="circle"
        />
        <Elements.Button onClick={() => this.handleClick(+1)}>&gt;</Elements.Button>
      </Elements.View>
    );
  }
};