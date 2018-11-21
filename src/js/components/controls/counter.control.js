'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
//import PropTypes from 'prop-types';
import { style, classes } from 'typestyle';

import ButtonControl from 'app-root/components/controls/button.control';
import BlockElement from 'app-root/components/elements/block.element';
import IconElement from 'app-root/components/elements/icon.element';

import Logger from 'app-root/libs/logger.lib';

// @flow
type Props = {
	dataClass?: object,
	value?: number,
	min: number,
	max: number,
	step: number,
	upLabel?: string,
	downLabel?: string,
	isIncreasing?: bool,
	isDisabled?: boolean,
	isVisible?: boolean
};
type State = {
	isVisible: boolean,
	isIncreasing: boolean,
	value: number
};

export default class CounterControl extends Component<Props, State> {
  displayName: string = 'CounterControl';

  state: State = {
    isVisible: true,
	isIncreasing: true,
	value: 0
  };

    counter: ?HTMLElement;
	
  static defaultProps: Props = {
      className: 'counter input-group',
	  dataClass: {
		inputClass: 'input',
        buttonClass: 'btn',
		iconClass: 'glyphicon',
        iconUpClass: 'glyphicon-thumbs-up',
        iconDownClass: 'glyphicon-thumbs-down',
        iconUpStatusClass: 'glyphicon-circle-arrow-up',
        iconDownStatusClass: 'glyphicon-circle-arrow-down'
      },
      value: 0,
      min: Number.MIN_VALUE,
      max: Number.MAX_VALUE,
      step: 1,
	  upLabel: 'Like',
	  downLabel: 'Unlike',
      isIncreasing: true,
	  isDisabled: false,
	  isVisible: true
  };

  constructor(props: Props): void {
    super(props);
    this.onUp = this.onUp.bind(this);
    this.onDown = this.onDown.bind(this);
	this.state = { isVisible: props.isVisible, isIncreasing: props.isIncreasing, value: props.value };
  }

  getValidatorData(): object {
    return this.state;
  }
  
   componentWillReceiveProps(nextProps: object): void {
	 	this._logPropsAndState(`nextProps.value: ${nextProps.value}`);
	 	this.setState({
	 		isIncreasing: nextProps.value > this.props.value
	 	});
	}
	
	shouldComponentUpdate(nextProps, nextState) {
		this._logPropsAndState(`nextState.value: ${nextState.value}, nextState.isIncreasing: ${nextState.isIncreasing}`);
		return (nextState.value >= this.props.min && nextState.value <= this.props.max);
	}
	
	componentDidUpdate(prevProps: object, prevState: object): void {
		this._logPropsAndState(`prevState.value: ${prevState.value}, prevState.isIncreasing: ${prevState.isIncreasing}`);
	}
	
	_logPropsAndState(data: string): void {
		Logger.debug(`data => ${data}`);
		Logger.debug(`value => ${this.props.value}`);
		Logger.debug(`isIncreasing => ${this.state.isIncreasing}`);
	}
	
	onUp(event: SyntheticEvent<HTMLButtonElement>): void {
		if(this.state.value < this.props.max) {
		 	this.setState({
		 		value: this.state.value + this.props.step,
		 		isIncreasing: true
		 	});
		}
	}
	
	onDown(event: SyntheticEvent<HTMLButtonElement>): void {
		if(this.state.value > this.props.min) {
		 	this.setState({
		 		value: this.state.value - this.props.step,
		 		isIncreasing: false
			});
		}
	}
	
	/*onUp(field) {
		return event => {
		  let state = { isIncreasing: true };
		  state[value] = this.state.value + this.props.step;
		  Strategy.activateRule(this.validatorTypes, field);
		  this.setState(state, () => {
			this.props.handleValidation(field)(event);
		  });
		  if (this.props.onUp) {
			this.props.onUp(event);
		  }
		};
	}
	
	onDown(field) {
		return event => {
		  let state = { isIncreasing: false };
		  state[value] = this.state.value - this.props.step;
		  Strategy.activateRule(this.validatorTypes, field);
		  this.setState(state, () => {
			this.props.handleValidation(field)(event);
		  });
		  if (this.props.onDown) {
			this.props.onDown(event);
		  }
		};
	}*/
  
  render(): Node {
    const {
      className,
	  isDisabled,
	  upLabel,
	  downLabel,
      children,
      dataClass,
      ...rest
    } = this.props;

    const controlClassName = classes(
      className,
      this.state.isVisible ? 'show' : 'hidden'
    );
	const iconUpClassName = classes(
      dataClass.iconClass,
      dataClass.iconUpClass
    );
	const iconDownClassName = classes(
      dataClass.iconClass,
      dataClass.iconDownClass
    );
	const iconStatusClassName = classes(
      dataClass.iconClass,
      this.state.isIncreasing ? dataClass.iconUpStatusClass : dataClass.iconDownStatusClass
    );
    rest.className = dataClass.inputClass;
		return (
			<div className={controlClassName}>
				<ButtonControl onClick={() => this.onUp(e)} className={dataClass.buttonClass isDisabled={isDisabled}}>
					<Icon className={iconUpClassName} />
						{upLabel}
				</ButtonControl>
				<ButtonControl onClick={() => this.inDown(e)} className={dataClass.buttonClass} isDisabled={isDisabled}>
					<Icon className={iconDownClassName} />
						{downLabel}
				</ButtonControl>
				<BlockElement ref={counter => (this.counter = counter)} {...rest}>{this.state.value}</BlockElement>
				<IconElement className={iconStatusClassName} />
			</div>
		);
  }
};
