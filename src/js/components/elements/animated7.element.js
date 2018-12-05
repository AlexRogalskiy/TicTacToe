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

export default class Animated7Element extends Component<Props, State> {
  displayName: string = 'Animated7Element';

  view: ?HTMLElement;

  state: State = {
	  anims: [0, 1, 2, 3, 4].map((_, i) => new Animated.Value(0.2))
  };
  
  handleClick(): void {
    this.state.anims.forEach(anim => { anim.setValue(0.2); });
    Animated.sequence(
      this.state.anims.map(anim => Animated.spring(anim, { toValue: 1 }))
    ).start();
  }
	
  render(): Node {
    return (
      <Elements.View>
        {this.state.anims.map((anim, i) =>
          <Animated.div
		  	ref={view => (this.view = view)}
            style={{opacity: anim, position: 'relative'}}
            className="circle"
            onClick={i === 0 && this.handleClick}>
            {i === 0 && 'Click'}
          </Animated.div>
        )}
      </Elements.View>
    );
  }
};