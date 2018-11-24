'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
import { Link } from 'react-router';

import { Elements, Stylesheets } from 'libs/elements.lib';
import SimulatorElement from 'components/elements/simulator.element';
import EditorElement from 'components/elements/editor.element';

/* @flow */
type ListItem = {
	id: string;
	data: Object<any>;
};
type Props = {
	data?: Object<ListItem>;
	title?: string;
	params?: Object<any>;
	children?: Node;
};
type State = {
	code?: string;
};

export default class EditPageElement extends Component<Props, State> {
  displayName: string = 'EditPageElement';

  view: ?HTMLElement;

  state: State = {
	  code: null
  };

  static defaultProps: Props = {
	className: 'edit-page',
	data: { 'host': require('raw-loader!app-root/components/elements/host.element') },
	title: 'Link',
	params: { id: 'host' }
  };

  componentDidMount(): void {
    this.setState({ this.props.data[this.props.params.id] });
  }
  
  render(): Node {
    if (!this.state.code) {
      return null;
    }

    return (
      <Elements.View className="main" ref={view => (this.view = view)}>
	    <Link to={'/'} style={[styles.close]}>
          {this.props.title}
        </Link>
		<SimulatorElement
          code={this.state.code}
        />
        <EditorElement
          initialCode={this.state.code}
          onChange={(code) => this.setState({ code })}
        />
      </Elements.View>
	);
  }
};

const styles = Stylesheets.create({
  close: {
    position: 'absolute',
    left: 10,
    top: 10,
    width: 30,
    height: 30,
    textDecoration: 'none',
    color: '#ccc',
    fontSize: 26
  }
});