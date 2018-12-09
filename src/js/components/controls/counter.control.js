'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
//import PropTypes from 'prop-types';
import { style, classes } from 'typestyle';

import ButtonControl from 'components/controls/button.control';
import BlockElement from 'components/elements/block.element';
import IconElement from 'components/elements/icon.element';

import { Elements } from 'libs/elements.lib';
import Logger from 'libs/logger.lib';

/* @flow */
type Props = {
	dataClass?: Object<any>;
	value?: number;
	min: number;
	max: number;
	step: number;
	upLabel?: string;
	downLabel?: string;
	isIncreasing?: boolean;
	isDisabled?: boolean;
	isVisible?: boolean;
};
type State = {
	isVisible: boolean;
	isIncreasing: boolean;
	value: number;
};

export default class CounterControl extends Component<Props, State> {
  displayName: string = 'CounterControl';

  state: State = {
    isVisible: this.props.isVisible,
	isIncreasing: this.props.isIncreasing,
	value: this.props.value
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
  }

  getValidatorData(): State {
    return this.state;
  }
  
   componentWillReceiveProps(nextProps: Props): void {
	 	this._logPropsAndState(`nextProps.value: ${nextProps.value}`);
	 	this.setState({
	 		isIncreasing: nextProps.value > this.props.value
	 	});
	}
	
	shouldComponentUpdate(nextProps: Props, nextState: Props): void {
		this._logPropsAndState(`nextState.value: ${nextState.value}, nextState.isIncreasing: ${nextState.isIncreasing}`);
		return (nextState.value >= this.props.min && nextState.value <= this.props.max);
	}
	
	componentDidUpdate(prevProps: Props, prevState: Props): void {
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
			<Elements.View className={controlClassName}>
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
			</Elements.View>
		);
  }
};


/*
import React from 'react'
import { shallow } from 'enzyme'
import Counter from './Counter'

function setup(value = 0) {
  const actions = {
    onIncrement: jest.fn(),
    onDecrement: jest.fn()
  }
  const component = shallow(
    <Counter value={value} {...actions} />
  )

  return {
    component: component,
    actions: actions,
    buttons: component.find('button'),
    p: component.find('p')
  }
}

describe('Counter component', () => {
  it('should display count', () => {
    const { p } = setup()
    expect(p.text()).toMatch(/^Clicked: 0 times/)
  })

  it('first button should call onIncrement', () => {
    const { buttons, actions } = setup()
    buttons.at(0).simulate('click')
    expect(actions.onIncrement).toBeCalled()
  })

  it('second button should call onDecrement', () => {
    const { buttons, actions } = setup()
    buttons.at(1).simulate('click')
    expect(actions.onDecrement).toBeCalled()
  })

  it('third button should not call onIncrement if the counter is even', () => {
    const { buttons, actions } = setup(42)
    buttons.at(2).simulate('click')
    expect(actions.onIncrement).not.toBeCalled()
  })

  it('third button should call onIncrement if the counter is odd', () => {
    const { buttons, actions } = setup(43)
    buttons.at(2).simulate('click')
    expect(actions.onIncrement).toBeCalled()
  })

  it('third button should call onIncrement if the counter is odd and negative', () => {
    const { buttons, actions } = setup(-43)
    buttons.at(2).simulate('click')
    expect(actions.onIncrement).toBeCalled()
  })

  it('fourth button should call onIncrement in a second', (done) => {
    const { buttons, actions } = setup()
    buttons.at(3).simulate('click')
    setTimeout(() => {
      expect(actions.onIncrement).toBeCalled()
      done()
    }, 1000)
  })
})
*/