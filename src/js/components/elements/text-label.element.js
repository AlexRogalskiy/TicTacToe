'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
import { Elements, Stylesheets } from 'libs/elements.lib';

/* @flow */
type Props = {
	message?: string;
	children?: Node;
};
type State = {
	message?: string;
};

export default class TextLabelElement extends Component<Props, State> {
  displayName: string = 'TextLabelElement';

  view: ?HTMLElement;

  state: State = {
	  message: this.props.message
  };
  
  static defaultProps: Props = {
	className: 'text-label'
  };

  constructor(props: Props): void {
    super(props);
    //this.state = { message: props.message };
  }
  
  render(): Node {
    return (
      <Elements.View ref={view => (this.view = view)} style={[styles.container]}>
        <Elements.Text>
			{ this.state.message }
		</Elements.Text>
      </Elements.View>
	);
  }
};

const styles = Stylesheets.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});