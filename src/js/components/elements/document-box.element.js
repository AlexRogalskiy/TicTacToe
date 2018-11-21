'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
import { Elements, Stylesheets } from 'app-root/libs/elements.lib';
import StatusBar2Element from 'app-root/components/elements/statusbar2.element';
import HostElement from 'app-root/components/elements/host.element';

// @flow
type Props = {
	keyword?: string,
	data?: Object<{
		description: string,
		values: Array<string>
	}>,
	onChangeValue?: func,
	children?: Node
};

export default class DocumentBoxElement extends Component<Props> {
  displayName: string = 'DocumentBoxElement';

  view: ?HTMLElement;
  
  static defaultProps: Props = {
	className: 'document-box',
	data: {}
  };

  render(): Node {
    const help = this.props.data[this.props.keyword];
    if (!help) {
		return null;
    }

    const values = help.values.map((value, ii) => (
        <span key={value}>
          {ii !== 0 && ' | '}
          <a href="#" onClick={() => this.props.onChangeValue(value)}>
            {value}
          </a>
        </span>
      )
    );

    return (
      <div id="help" ref={view => (this.view = view)}>
        <strong>{this.props.keyword}</strong>
        <br />
        <br />
        {help.description}
        <br />
        <br />
        Values: {values}
      </div>
	);
  }
};