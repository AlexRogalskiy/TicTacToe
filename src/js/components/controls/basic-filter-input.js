'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
//import PropTypes from 'prop-types';
import { style, classes } from 'typestyle';

type Props = {
	isDisabled?: bool
};
type State = {
	isDisabled: bool
};

export default class BasicFilterInput extends Component<Props, State> {
  displayName: string = 'BasicFilterInput';

  input: ?HTMLInputElement;
  
  	state: State = {
		isDisabled: false
	};
	
  static defaultProps: Props = {
	  className: 'input-filter',
	  isDisabled: false
  };
  
    constructor(props: Props): void {
        super(props);
        this.onChange = this.onChange.bind(this);
		this.state = { isDisabled: props.isDisabled };
    }
	
  onChange(field: string): func {
    return (event: SyntheticEvent<HTMLInputElement>) => {
      const value = event.currentTarget.value.trim();
      this.setState({ field: value });
	  this.props.filter(value);
      if (this.props.onChange) {
        this.props.onChange(event);
      }
    };
  }

  render(): Node {
    const {
      className,
	  isDisabled,
	  onChange,
      children,
      ...rest
    } = this.props;
    return (
       <BasicInput
			ref={input => (this.input = input)}
			onChange={this.onChange(this.props.name)}
			isDisabled={this.state.isDisabled}
			validator='input-filter'
            {...rest}
          />
          {children}
      </BasicInput>
    );
  }
};
