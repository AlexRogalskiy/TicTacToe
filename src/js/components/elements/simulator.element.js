'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
import { Elements, Stylesheets } from 'libs/elements.lib';
import StatusBar2Element from 'components/elements/statusbar2.element';
import HostElement from 'components/elements/host.element';

/* @flow */
type Props = {
	code?: string;
	children?: Node;
};

export default class SimulatorElement extends Component<Props> {
  displayName: string = 'SimulatorElement';

  view: ?HTMLElement;
  
  static defaultProps: Props = {
	className: 'simulator',
	code: require('raw-loader!app-root/components/elements/host.element')
  };

  render(): Node {
	return (
		  <Elements.View ref={view => (this.view = view)} style={[styles.container]}>
			<Elements.View style={[styles.phone]}>
			  <StatusBar2Element />
			  <HostElement
				style={[styles.innerFrame]}
				code={this.props.code}
			  />
			</Elements.View>
		  </Elements.View>
	);
  }
};

const styles = Stylesheets.create({
  container: {
    display: 'flex',
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center'
  },
  phone: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    width: 320,
    height: 568,
    borderWidth: 1,
    borderColor: '#ccc',
    borderStyle: 'solid',
    borderRadius: 2,
    fontFamily: '"San Francisco", "Helvetica Neue", Helvetica, sans-serif',
    fontSize: 12
  }
});