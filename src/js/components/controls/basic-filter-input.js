'use strict';

/**
 * Module dependencies
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { style, classes } from 'typestyle';

export default class BasicFilterInput extends Component {
  get displayName() {
    return 'BasicFilterInput';
  }
  
  static get propTypes() {
    return {
      isDisabled: PropTypes.bool
    };
  }

  static get defaultProps() {
    return {
      className: 'input-filter',
	  isDisabled: false
    };
  }
  
    constructor(props){
        super(props);
        this.onChange = this.onChange.bind(this);
    }
	
  onChange(field) {
    return event => {
      const value = event.target.value.trim();
      this.setState({ field: value });
	  this.props.filter(value);
      if (this.props.onChange) {
        this.props.onChange(event);
      }
    };
  }

  render() {
    const {
      className,
	  isDisabled,
	  onChange,
      children,
      ...rest
    } = this.props;
    return (
       <BasicInput
			onChange={this.onChange(this.props.name)}
			isDisabled={isDisabled}
			validator='input-filter'
            {...rest}
          />
          {children}
      </BasicInput>
    );
  }
};
