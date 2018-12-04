'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';

import { Elements } from 'libs/elements.lib';

/* you'll need this CSS somewhere
.fade-enter {
  opacity: 0;
  z-index: 1;
}

.fade-enter.fade-enter-active {
  opacity: 1;
  transition: opacity 250ms ease-in;
}
*/

/* @flow */
type Props = {
	route: Object<any>;
	match: Object<any>;
	location: Object<any>;
};

const NavLink = (props: Props): Node => {
	return (
		<ELements.ListItem style={styles.navItem}>
		  <Link {...props} style={{ color: "inherit" }} />
		</ELements.ListItem>
	);
}

const HSL = ({ match: { params } }: Props): Node => {
	return (
		<ELements.View
		  style={{
			...styles.fill,
			...styles.hsl,
			background: `hsl(${params.h}, ${params.s}%, ${params.l}%)`
		  }}
		>
		  hsl(
		  {params.h}, {params.s}
		  %, {params.l}
		  %)
		</ELements.View>
	);
}

const RGB = ({ match: { params } }: Props): Node => {
	return (
		<ELements.View
		  style={{
			...styles.fill,
			...styles.rgb,
			background: `rgb(${params.r}, ${params.g}, ${params.b})`
		  }}
		>
		  rgb(
		  {params.r}, {params.g}, {params.b})
		</ELements.View>
	);
}


const AnimationView = ({ route, match, location }: Props): Node => (
  return (
  {// <Router> }
      <Route
        render={({ location }) => (
          <ELements.View style={styles.fill}>
            <Route
              exact
              path='/'
              render={() => <Redirect to='/hsl/10/90/50' />}
            />

            <ELements.List style={styles.nav}>
              <NavLink to='/hsl/10/90/50'>Red</NavLink>
              <NavLink to='/hsl/120/100/40'>Green</NavLink>
              <NavLink to='/rgb/33/150/243'>Blue</NavLink>
              <NavLink to='/rgb/240/98/146'>Pink</NavLink>
            </ELements.List>

            <ELements.View style={styles.content}>
              <TransitionGroup>
                {/* no different than other usage of
                CSSTransition, just make sure to pass
                `location` to `Switch` so it can match
                the old location as it animates out*/}
                <CSSTransition
                  key={location.key}
                  classNames="fade"
                  timeout={300}
                >
                  <Switch location={location}>
                    <Route exact path='/hsl/:h/:s/:l' component={HSL} />
                    <Route exact path='/rgb/:r/:g/:b' component={RGB} />
                    {/* Without this `Route`, we would get errors during
                    the initial transition from `/` to `/hsl/10/90/50`*/}
                    <Route render={() => <ELements.View>Not Found</ELements.View>} />
                  </Switch>
                </CSSTransition>
              </TransitionGroup>
            </ELements.View>
          </ELements.View>
        )}
      />
	  {// </Router> }
  );
);

const styles = Stylesheets.create({
	fill: {
	  position: "absolute",
	  left: 0,
	  right: 0,
	  top: 0,
	  bottom: 0
	},
	content: {
	  ...styles.fill,
	  top: "40px",
	  textAlign: "center"
	},
	nav: {
	  padding: 0,
	  margin: 0,
	  position: "absolute",
	  top: 0,
	  height: "40px",
	  width: "100%",
	  display: "flex"
	},
	navItem: {
	  textAlign: "center",
	  flex: 1,
	  listStyleType: "none",
	  padding: "10px"
	},
	hsl: {
	  ...styles.fill,
	  color: "white",
	  paddingTop: "20px",
	  fontSize: "30px"
	},
	rgb: {
	  ...styles.fill,
	  color: "white",
	  paddingTop: "20px",
	  fontSize: "30px"
	}
});

export default AnimationView;
