'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';

/* @flow */
type State = {
	isAuthenticated: boolean;
};

export default class AuthService<{}, State> {
  displayName: string = 'FakeAuthService';
  
  state: State = {
	  isAuthenticated: false
  };

  login(cb: func): void {
	this.state = { isAuthenticated: true };
    setTimeout(cb, 100);
  }
  
  logout(cb: func): void {
    this.state = { isAuthenticated: false };
    setTimeout(cb, 100);
  }
};

/*
const AuthButton = withRouter(
  ({ history }) =>
    fakeAuth.isAuthenticated ? (
      <p>
        Welcome!{" "}
        <button
          onClick={() => {
            fakeAuth.signout(() => history.push("/"));
          }}
        >
          Sign out
        </button>
      </p>
    ) : (
      <p>You are not logged in.</p>
    )
);

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        fakeAuth.isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}
*/