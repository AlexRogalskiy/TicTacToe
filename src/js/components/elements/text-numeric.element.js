'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
//import PropTypes from 'prop-types';
import { style, classes } from 'typestyle';

import { Elements } from 'libs/elements.lib';

/* @flow */
type Props = {
	isDisabled?: boolean;
	predicate?: func;
	count?: number;
	children?: Node;
};
type State = {
	isDisabled: boolean;
	count: number;
};

export default class TextNumericElement extends Component<Props, State> {
  displayName: string = 'TextNumericElement';

  view: ?HTMLElement;
	
  state: State = {
	isDisabled: this.props.isDisabled,
	count: this.props.count
  };
	
  static defaultProps: Props = {
    className: 'numeric-text',
	isDisabled: false,
	predicate: Function.prototype
  };
  
  constructor(props: Props): void {
    super(props);
    this.onUp = this.onUp.bind(this);
    this.onDown = this.onDown.bind(this);
  }
  
  onUp(event: SyntheticEvent<HTMLButtonElement>): void {
    this.setState(prevState => ({
      count: prevState.count + 1
    }));
  }
  
  onDown(event: SyntheticEvent<HTMLButtonElement>): void {
    this.setState(prevState => ({
      count: prevState.count - 1
    }));
  }
  
  renderTextField(predicate: func): Node {
    return (predicate.call(this))
				? <Elements.View>
					<Elements.Text>{this.state.count}</Elements.Text>
				 </Elements.View>;
				: null;
  }
  
  render(): Node {
    const {
	  className,
	  isDisabled,
	  predicate,
	  count,
      children,
      ...rest
    } = this.props;
	return (
			<Elements.View className={className} ref={view => (this.view = view)} disabled={this.state.isDisabled} {...rest}>
				  {this.renderTextField(predicate)}
				  <Elements.Button onClick={this.onUp}>Up</Elements.Button>
				  <Elements.Button onClick={this.onDown}>Down</Elements.Button>
			</Elements.View>
		);
    }
};
