'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
//import PropTypes from 'prop-types';
import { style, classes } from 'typestyle';
// import update     from 'react-addons-update';
// import ClassNames from 'classnames';

import BasicSubmitButtonControl from 'app-root/components/controls/basic-submit-button.control';
import BasicInputControl from 'app-root/components/controls/basic-input.control';

// @flow
type Props = {
    dataClass?: object;
    buttonSubmitMessage?: string;
    fields: object;
	onSubmit?: func;
};
type State = {
	fields: object;
};

export default class BasicFormControl extends Component<Props, State> {
	displayName: string = 'BasicFormControl';

    form: ?HTMLFormElement;
	
  static defaultProps: Props = {
	className: 'form',
    dataClass: { fieldClass: 'field', buttonSubmitClass: 'button button-submit' },
    buttonSubmitMessage: 'Send',
    fields: {}
  };
  
  constructor(props: Props): void {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  
  onChange(field: string): func {
        // const value = e.target.value;
        // this.setState({fields[e.target.name]: value});
        // this.refs[field].onChange(e);
        return (event: SyntheticEvent<HTMLElement>) => {
            this.setState({ fields[field]: event.currentTarget.value });
            //state[field] = event.target.value;
            //let target = e.target.name.substring(1);
            this.refs[field].onChange(event);
        };
  }
  
  onSubmit(e: SyntheticEvent<HTMLFormElement>): void {
    e.preventDefault();
    Logger.debug(`Fields: ${this.state.fields.inspect}`);
    if(this.props.onSubmit) {
      this.props.onSubmit(e);
    }
  }
  
  render(): Node {
    const { className, dataClass, fields, onSubmit, buttonSubmitMessage, ...rest } = this.props;
    const { fieldClass, buttonSubmitClass, ...restClass } = dataClass;
    return (
      <form ref={form => (this.form = form)} className={className} onSubmit={() => this.onSubmit(e)} {...rest}>
          <div>
            fields.map(function(item) {
              return <BasicInputControl item={item} key={item.id} label={item.label} onChange={this.onChange(item.name)} className=classes(fieldClass, item.className} dataClass={restClass} />
            }.bind(this));
          </div>
          <BasicSubmitButtonControl message={buttonSubmitMessage} className={buttonSubmitClass} />
      </form>
    );
  }
};
