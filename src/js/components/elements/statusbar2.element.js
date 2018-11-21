'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
import { Elements, Stylesheets } from 'app-root/libs/elements.lib';
import { DateTime } from 'app-root/libs/helpers.lib';

// @flow
type Props = {
	interval: func,
	children?: Node
};

const DEFAULT_UPDATE_INTERVAL = 1000;

export default class StatusBar2Element extends Component<Props> {
  displayName: string = 'StatusBar2Element';

  view: ?HTMLElement;
  
  static defaultProps: Props = {
	className: 'statusbar',
	interval: Function.prototype
  };
  
  componentDidMount(): void {
    this.interval = setInterval(() => this.forceUpdate(), DEFAULT_UPDATE_INTERVAL);
  }

  componentWillUnmount(): void {
    clearInterval(this.interval);
  }

  render(): Node {
    return (
      <Elements.View ref={view => (this.view = view)} style={[styles.statusbar]}>
        <Elements.Text style={[styles.section, styles.network]}>
          &#x25cf;&#x25cf;&#x25cf;&#x25cf;&#x25cf; React
        </Elements.Text>
        <Elements.Text style={[styles.section, styles.time]}>
          {DateTime.currentTime()}
        </Elements.Text>
        <Elements.Text style={[styles.section, styles.info]}>
          100%
        </Elements.Text>
      </Elements.View>
    );
  }
};

StatusBar2Element.height = auto;
const styles = Stylesheets.create({
  statusbar: {
    height: StatusBar2Element.height,
    display: 'flex',
    flexDirection: 'row',
  },
  section: {
    flex: 1,
    padding: 4,
    fontWeight: '500',
  },
  network: {
    textAlign: 'left',
  },
  time: {
    textAlign: 'center',
  },
  info: {
    textAlign: 'right',
  }
});