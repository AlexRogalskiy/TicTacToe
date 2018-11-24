'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
import { Router, Route, Link } from 'react-router'

import { Elements, Stylesheets } from 'libs/elements.lib';
import HostElement from 'components/elements/host.element';


/* @flow */
type CardProps = {
	id: number;
	code?: string;
	children?: Node;
};

class CardElement extends Component<CardProps> {
  displayName: string = 'CardElement';

  view: ?HTMLElement;

  static defaultProps: Props = {
	className: 'card'
  };
  
  render(): Node {
    return (
      <Elements.View ref={view => (this.view = view)} style={[styles.card]}>
        <HostElement code={[this.props.code]} />
        <Link to={'/example/' + this.props.id}>
          Check it out
        </Link>
      </Elements.View>
    );
  }
}

type PageProps = {
	data: Object<string>;
	children?: Node;
};

export default class CardPageElement extends Component<PageProps> {
  displayName: string = 'CardPageElement';

  view: ?HTMLElement;
  
  static defaultProps: Props = {
	className: 'card-page',
	data: []
  };

  render(): Node {
    return (
      <Elements.View ref={view => (this.view = view)} style={[styles.container]}>
        {this.props.data.map((code, idx) => (
            <CardElement
              id={idx}
              key={idx}
              code={code}
            />
          )
        )}
	  </Elements.View>
    );
  }
};

const styles = Stylesheets.create({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eee',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    width: 300,
    height: 300,
    margin: 10,
    backgroundColor: 'white',
    position: 'relative',
    fontFamily: '"San Francisco", "Helvetica Neue", Helvetica, sans-serif',
    fontSize: 12,
  }
});