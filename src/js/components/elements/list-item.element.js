'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
import { Elements, Stylesheets } from 'libs/elements.lib';

/* @flow */
type Props = {
	title?: string;
	message?: string;
	children?: Node;
};
type State = {
	title?: string;
	message?: string;
};

export default class ListItemElement extends Component<Props, State> {
  displayName: string = 'ListItemElement';

  view: ?HTMLElement;

  state: State = {
	  title: null,
	  message: null
  };
  
  static defaultProps: Props = {
	className: 'list-item'
  };

  constructor(props: Props): void {
    super(props);
    this.state = { title: props.title, message: props.message };
  }
  
  render(): Node {
    return (
      <Elements.View ref={view => (this.view = view)} style={[styles.item]}>
        <Elements.Image style={[styles.icon]} />
        <Elements.View style={[styles.content]}>
          <Elements.Text style={[styles.title]}>
			  { this.state.title }
          </Elements.Text>
          <Elements.Text style={[styles.description]}>
			  { this.state.message }
          </Elements.Text>
        </Elements.View>
      </Elements.View>
	);
  }
};

const DEFAULT_IMAGE_SIZE = 60;
const styles = Stylesheets.create({
  item: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  icon: {
    width: DEFAULT_IMAGE_SIZE,
    height: DEFAULT_IMAGE_SIZE,
    backgroundColor: '#336699',
    marginRight: 10
  },
  content: {
    flex: 1,
    justifyContent: 'center'
  },
  title: {
    fontWeight: 'bold'
  },
  description: {
    paddingTop: 4,
    color: '#777'
  }
});