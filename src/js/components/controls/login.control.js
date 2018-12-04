'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
//import PropTypes from 'prop-types';
import { style, classes } from 'typestyle';

import AuthService from 'components/services/auth.service';
import { Elements } from 'libs/elements.lib';

/* @flow */
type Props = {
	location: Object<any>;
	children?: Node;
};
type State = {
	redirectToReferrer: boolean;
};

export default class LoginControl extends Component<Props, State> {
  displayName: string = 'LoginControl';

  view: ?HTMLElement;
  
  state: State = {
	  redirectToReferrer: false
  };

  login = () => {
		AuthService.login(() => {
		  this.setState({ redirectToReferrer: true });
		});
  };

  render(): Node {
    const {
      children,
      ...rest
    } = this.props;
    let { fromRoute } = this.props.location.state || { from: { pathname: '/' } };
    if (this.state.redirectToReferrer) return <Redirect to={fromRoute} />;
    return (
      <Elements.View ref={view => (this.view = view)} {...rest}>
        <Elements.Paragraph>You must log in to view the page at {fromRoute.pathname}</Elements.Paragraph>
        <Elements.Button onClick={this.login}>Log in</Elements.Button>
      </Elements.View>
    );
  }
};
