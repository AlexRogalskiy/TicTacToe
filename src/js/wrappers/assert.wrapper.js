'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
import { render, unmountComponentAtNode } from "react-dom";
import { Route, Link, MemoryRouter } from "react-router-dom";
import { Simulate } from "react-addons-test-utils";

import AssertService from 'components/services/assert.service';
import { Elements } from 'libs/elements.lib';

/* @flow */
type Props = {
	childred?: Node;
};

export default function AssertWrapper<Props: {}>({
  initialEntries,
  initialIndex,
  subject: Subject,
  steps,
  elem
}): React.ComponentType<Props> {

  const wrapper = document.createElement(elem);
  
  class Test extends Component<Props> {
    render() {
      return (
        <MemoryRouter
          initialIndex={initialIndex}
          initialEntries={initialEntries}
        >
          <Route
            render={props => (
              <AssertService wrapper={wrapper} steps={steps} {...props}>
                <Subject />
              </AssertService>
            )}
          />
        </MemoryRouter>
      );
    }
  };
  render(<Test />, wrapper);
};



/*
// our Subject, the App, but you can test any sub
// section of your app too
const App = () => (
  <div>
    <Route
      exact
      path="/"
      render={() => (
        <div>
          <h1>Welcome</h1>
        </div>
      )}
    />
    <Route
      path="/dashboard"
      render={() => (
        <div>
          <h1>Dashboard</h1>
          <Link to="/" id="click-me">
            Home
          </Link>
        </div>
      )}
    />
  </div>
);

// the actual test!
it("navigates around", done => {
  renderTestSequence({
    // tell it the subject you're testing
    subject: App,

    // and the steps to execute each time the location changes
    steps: [
      // initial render
      ({ history, div }) => {
        // assert the screen says what we think it should
        console.assert(div.innerHTML.match(/Welcome/));

        // now we can imperatively navigate as the test
        history.push("/dashboard");
      },

      // second render from new location
      ({ div }) => {
        console.assert(div.innerHTML.match(/Dashboard/));

        // or we can simulate clicks on Links instead of
        // using history.push
        Simulate.click(div.querySelector("#click-me"), {
          button: 0
        });
      },

      // final render
      ({ location }) => {
        console.assert(location.pathname === "/");
        // you'll want something like `done()` so your test
        // fails if you never make it here.
        done();
      }
    ]
  });
});
*/