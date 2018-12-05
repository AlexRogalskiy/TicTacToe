'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
import Link from 'react-router-dom/Link';
import { AnimatedRoute } from 'react-router-transition';
//import PropTypes from 'prop-types';

import AboutView from 'views/about.view';
import { Elements } from 'libs/elements.lib';
//import { css } from 'glamor';

const slide = (val) => {
	return spring(val, {
		stiffness: 125,
		damping: 16,
	});
};
const glide = (val) => {
	return spring(val, {
		stiffness: 174,
		damping: 24,
	});
};

const transitions = {
  atEnter: {
    offset: -100,
  },
  atLeave: {
    offset: slide(-150),
  },
  atActive: {
    offset: slide(0),
  },
};

//css={routeRule}
export default (): Node => (
	<Elements.View>
		<Link to='/sidebar'>Show sidebar</Link>
		<AnimatedRoute
		  path='/sidebar'
		  component={AboutView}
		  {...transitions}
		  mapStyles={(styles) => ({
			transform: `translateX(${styles.offset}%)`,
		  })}
		/>
	</Elements.View>
);