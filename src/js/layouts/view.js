"use strict";

/**
 * Module dependencies
 */
import React, { Component } from 'react';
//import { BrowserRouter, Router, Route } from 'react-router-dom';

import Board from '../components/board';
import Header from './particles/header';
import Footer from './particles/footer';
import LifeCycle from '../mixins/lifecycle';
import TicTacToeBoard from '../containers/tictactoeboard';
import ProfileControl from '../components/profile-control';

const config = require('../config.json');

class AppView extends Component {
	displayName: 'AppView'
	
	mixins: [ LifeCycle ]
	
	static get defaultProps() {
		return {
        	className: 'view'
        };
    }
	
    render() {
        return (
			<div {...this.props}>
				<Header />
				<ProfileControl name="profile" />
				<TicTacToeBoard player={config.default.player1.marker} />
				<Footer />
			</div>
		)
    }
}
//<Route exact path="/" component={Board}/>
export default AppView;