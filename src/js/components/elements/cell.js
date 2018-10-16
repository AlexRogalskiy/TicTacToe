'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
//import PropTypes from 'prop-types';
import { style, classes } from 'typestyle';

type Props = {
	dataClass?: object,
    isWinner?: bool
};

export default class Cell extends Component<Props> {
  displayName: string = 'Cell';

  static defaultProps: Props = {
      className: 'cell',
      dataClass: { winnerClass: 'cell-winner' },
      isWinner: false
  };

  render(): Node {
    const {
      className,
      onPress,
      dataClass,
      state,
      isWinner,
      ...rest
    } = this.props;
    const cellClassName = classes(className, isWinner && dataClass.winnerClass);
    return (
      <div onClick={onPress} className={cellClassName} {...rest}>
        {state}
      </div>
    );
  }
};
