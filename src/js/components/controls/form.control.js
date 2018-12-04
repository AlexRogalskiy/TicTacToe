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
	isDisabled?: boolean;
	children?: Node;
};
type State = {
	isDisabled: boolean;
};

export default class FormControl extends Component<Props, State> {
	displayName: string = 'FormControl';
	
	view: ?HTMLElement;

	static defaultProps: Props = {
      className: 'form',
	  dataClass: {
        headerClass: 'App-header'
      }
	};
	
	state: State = {
		isDisabled: this.props.isDisabled
	};

	render(): Node {
    const { className, dataClass, isDisabled, children, ...rest } = this.props;
		return (
		  <Elements.Form
			onSubmit={event => {
			  event.preventDefault();
			  event.target.reset();
			  this.setState({
				isDisabled: false
			  });
			}}
			className={className}
			ref={view => (this.view = view)}
			{...rest}
		  >
			<Prompt
			  when={this.state.isDisabled}
			  message={location =>
				`Are you sure you want to go to ${location.pathname}`
			  }
			/>

			<Elements.Paragraph>
				IsDisabled? {" "}
				{this.state.isDisabled ? "Yes, click a link or the back button" : "Nope"}
			</Elements.Paragraph>

			<Elements.Paragraph>
			  <Elements.Control
				size="50"
				placeholder="type something to block transitions"
				onChange={event => {
				  this.setState({
					isDisabled: event.target.value.length > 0
				  });
				}}
			  />
			<Elements.Paragraph>

			<Elements.Paragraph>
			  <Elements.Button>Submit to stop blocking</Elements.Button>
			</Elements.Paragraph>
		  </Elements.Form>
		);
	}
};