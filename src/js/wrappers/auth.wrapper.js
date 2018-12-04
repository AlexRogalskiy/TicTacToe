'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
import { withRouter } from 'react-router';

/* @flow */
type Props = {
	isAuthenticated: boolean;
};

export default function AuthWrapper(WrappedComponent: React.ComponentType<Props>): React.ComponentType<Props> {

  class AuthenticatedComponent extends Component<Props> {
	displayName: string = 'AuthWrapper';
	
    componentWillMount(): void {
      this.checkAuth();
    }

    checkAuth(): void {
      if ( ! this.props.isAuthenticated) {
        this.props.history.push(`/`);
      }
    }

    render(): Node {
      return this.props.isAuthenticated
        ? <WrappedComponent wrappedComponentRef={c => (this.component = c)} { ...this.props } />
        : null;
    }
  };

  return withRouter(AuthenticatedComponent);
};