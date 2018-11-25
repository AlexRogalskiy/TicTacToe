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
	children?: Node;
};
type State = {
	text: string;
	inputText?: string;
	mode: string;
	isDisabled: boolean;
};

export default class TextControl extends Component<Props, State> {
  displayName: string = 'TextControl';

  view: ?HTMLElement;
	
  state: State = {
	text: '',
	inputText: '',
	mode: 'view',
	isDisabled: this.props.isDisabled
  };
	
  static defaultProps: Props = {
      className: 'text',
	  isDisabled: false
  };
  
  constructor(props: Props): void {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  handleChange(event: SyntheticEvent<HTMLInputElement>) {
    this.setState({ inputText: event.target.value });
  }
  
  handleSave(event: SyntheticEvent<HTMLButtonElement>) {
    this.setState({ text: this.state.inputText, mode: 'view' });
  }

  handleEdit(event: SyntheticEvent<HTMLButtonElement>) {
    this.setState({ mode: 'edit' });
  }
  
  renderInputField(): Node {
    return (this.state.mode === 'view')
				? null
				: <Elements.View>
					<Elements.Control
					  onChange={this.handleChange}
					  value={this.state.inputText}
					/>
				 </Elements.View>;
  }
  
  renderButton(): Node {
    return (this.state.mode === 'view')
				? <Elements.Button onClick={this.handleEdit}>
					Edit
				  </Elements.Button>
				: <Elements.Button onClick={this.handleSave}>
					Save
				  </Elements.Button>;
  }
  
  render(): Node {
    const {
	  className,
	  isDisabled,
      children,
      ...rest
    } = this.props;
	return (
			<Elements.View className={className} ref={view => (this.view = view)} disabled={this.state.isDisabled} {...rest}>
				 <Elements.Paragraph>Text: {this.state.text}</Elements.Paragraph>
				  {this.renderInputField()}
				  {this.renderButton()}
			</Elements.View>
		);
    }
};
