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
	dataClass?: Object<any>;
    isWinner?: boolean;
};
type State = {
	isWinner: boolean;
};

export default class CellElement extends Component<Props, State> {
  displayName: string = 'CellElement';

  state: State = {
	isWinner: this.props.isWinner
  };
	
  static defaultProps: Props = {
      className: 'cell',
      dataClass: { winnerClass: 'cell-winner' }
  };
  
  constructor(props: Props): void {
    super(props);
	//this.state = { isWinner: props.isWinner };
  }

  render(): Node {
    const {
      className,
      onPress,
      dataClass,
      value,
      isWinner,
      ...rest
    } = this.props;
    const cellClassName = classes(className, this.state.isWinner && dataClass.winnerClass);
    return (
      <Elements.View onClick={onPress} className={cellClassName} {...rest}>
        { value }
      </Elements.View>
    );
  }
};
