'use strict';

/**
 * Module dependencies
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { style, classes } from 'typestyle';

import { Button } from './button';
import { Block } from '../elements/block';
import { Icon } from '../elements/icon';

import { Logger } from '../../libs/logger';

class Counter extends Component {
  get displayName() {
    return 'Counter';
  }

  static get propTypes() {
    return {
		dataClass: PropTypes.object,
		value: PropTypes.number,
		min: PropTypes.number,
		max: PropTypes.number,
		step: PropTypes.number,
		upLabel: PropTypes.string,
		downLabel: PropTypes.string,
		isIncreasing: PropTypes.bool,
		isDisabled: PropTypes.bool,
		isVisible: PropTypes.bool
    };
  }

  static get defaultProps() {
    return {
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
      isIncreasing: false,
	  isDisabled: false,
	  isVisible: false
    };
  }

  constructor(props) {
    super(props);
    this.onUp = this.onUp.bind(this);
    this.onDown = this.onDown.bind(this);
  }

  getValidatorData() {
    return this.state;
  }
  
   componentWillReceiveProps(nextProps) {
	 	this._logPropsAndState(`nextProps.value: ${nextProps.value}`);
	 	this.setState({
	 		isIncreasing: nextProps.value > this.props.value
	 	});
	}
	
	shouldComponentUpdate(nextProps, nextState) {
		this._logPropsAndState(`nextState.value: ${nextState.value}, nextState.isIncreasing: ${nextState.isIncreasing}`);
		return (nextState.value >= this.props.min && nextState.value <= this.props.max);
	}
	
	componentDidUpdate(prevProps, prevState) {
		this._logPropsAndState(`prevState.value: ${prevState.value}, prevState.isIncreasing: ${prevState.isIncreasing}`);
	}
	
	_logPropsAndState(data) {
		Logger.debug(`data => ${data}`);
		Logger.debug(`value => ${this.props.value}`);
		Logger.debug(`isIncreasing => ${this.state.isIncreasing}`);
	}
	
	onUp() {
		if(this.state.value < this.props.max) {
		 	this.setState({
		 		value: this.state.value + this.props.step,
		 		isIncreasing: true
		 	});
		}
	}
	
	onDown() {
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
  
  render() {
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
				<Button onClick={this.onUp} className={dataClass.buttonClass isDisabled={isDisabled}}>
					<Icon className={iconUpClassName} />
						{upLabel}
					</Button>
				<Button onClick={this.inDown} className={dataClass.buttonClass} isDisabled={isDisabled}>
					<Icon className={iconDownClassName} />
						{downLabel}
				</Button>
				<Block {...rest}>{this.state.value}</Block>
				<Icon className={iconStatusClassName} />
			</div>
		);
  }
}

export default Counter;
