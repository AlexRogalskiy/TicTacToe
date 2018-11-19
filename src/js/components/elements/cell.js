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
type State = {
	isWinner: bool
};

export default class Cell extends Component<Props, State> {
  displayName: string = 'Cell';

  	state: State = {
		isWinner: false
	};
	
  static defaultProps: Props = {
      className: 'cell',
      dataClass: { winnerClass: 'cell-winner' }
  };
  
  constructor(props: Props): void {
    super(props);
	this.state = { isWinner: props.isWinner };
  }

  render(): Node {
    const {
      className,
      onPress,
      dataClass,
      state,
      isWinner,
      ...rest
    } = this.props;
    const cellClassName = classes(className, this.state.isWinner && dataClass.winnerClass);
    return (
      <div onClick={onPress} className={cellClassName} {...rest}>
        {state}
      </div>
    );
  }
};
