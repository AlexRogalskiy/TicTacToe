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

export default class Animated10Element extends Component<Props, State> {
  displayName: string = 'Animated10Element';

  view: ?HTMLElement;

  state: State = {
	  anim: new Animated.Value(0)
  };
  
  handleClick(): void {
    let rec = () => {
      Animated.sequence([
        Animated.timing(this.state.anim, {toValue: -1, duration: 150}),
        Animated.timing(this.state.anim, {toValue: 1, duration: 150}),
      ]).start(rec);
    };
    rec();
  }
	
  render(): Node {
    return (
      <Animated.div
        style={{
          left: this.state.anim.interpolate({
            inputRange: [-1, -0.5, 0.5, 1],
            outputRange: [0, 5, 0, 5]
          }),
          transform: [
            {rotate: this.state.anim.interpolate({
              inputRange: [-1, 1],
              outputRange: ['-10deg', '10deg']
            })}
          ]
        }}
        className="circle"
        onClick={this.handleClick}>
        Click
      </Animated.div>
    );
  }
};