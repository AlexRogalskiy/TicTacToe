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

export default class Animated3Element extends Component<Props, State> {
  displayName: string = 'Animated3Element';

  view: ?HTMLElement;

  state: State = {
	  anim: new Animated.Value(1)
  };
  
  componentWillMount(): void {
    this.interpolate = this.state.anim.interpolate({
      inputRange: [0, 1],
      outputRange: ['260deg', '0deg']
    });
    this.interpolate.addListener(v => console.log(v));
  }
  
  handleClick(): void {
	Animated.spring(this.state.anim, {toValue: 0}).start();
  }
	
  render(): Node {
    return (
      <Animated.div
		ref={view => (this.view = view)}
        style={{
          transform: [
            {rotate: this.interpolate},
            {scale: this.state.anim},
          ]
        }}
        className="circle"
        onClick={this.handleClick}>
        Click
      </Animated.div>
    );
  }
};