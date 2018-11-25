'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
import { Link, NavLink } from "react-router-dom";

const MenuView = (): Node => (
  <ul>
    <li>
      <Link to="/">Home</Link>
    </li>
    <li>
      <Link to="/about">About</Link>
    </li>
    <li>
      <Link to="/Items">Items</Link>
    </li>
	<li>
	  <NavLink to="/react" activeClassName="hurray">
		React
	  </NavLink>
	</li>
  </ul>
);

export default MenuView;