"use strict";

/**
 * Module dependencies
 */
import React, { Component } from 'react';
import reactMixin from 'react-mixin';
//import { BrowserRouter, Router, Route } from 'react-router-dom';

import TicTacToeBoard from '../containers/tictactoeboard';
import Board from '../components/board';

import Header from './partials/header';
import Footer from './partials/footer';

import LifeCycle from '../mixins/lifecycle';

import config from '../resources/config.json';

class AppView extends Component {
	
	get mixins() {
		return [ LifeCycle ];
	}
	
	get displayName() {
		return 'AppView';
	}
	
	static get defaultProps() {
		return {
        	className: 'view'
        };
    }
	
    render() {
        return (
			<div {...this.props}>
				<Header />
				<TicTacToeBoard player={config.default.player1.marker} />
				<Footer />
			</div>
		)
    }
}

reactMixin.onClass(AppView, LifeCycle);
//<Route exact path="/" component={Board}/>
export default AppView;