'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
import { unmountComponentAtNode } from 'react-dom';

/* @flow */
type Props = {
	wrapper: Object<HTMLElement>;
	steps: Array<any>;
	childred?: Node;
};

export default class AssertService extends Component<Props> {
	displayName: string = 'AssertService';
	
	static defaultProps: Props = {
	  wrapper: {},
	  steps: []
	};
	
    componentDidMount(): void {
      this.assert();
    }

    componentDidUpdate(): void {
      this.assert();
    }

    assert(): void {
      const nextStep = this.props.steps.shift();
      if (nextStep) {
        nextStep({ ...this.props, this.props.wrapper });
      } else {
        unmountComponentAtNode(this.props.wrapper);
      }
    }

    render(): Node {
      return this.props.children;
    }
};
