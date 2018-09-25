"use strict";

/**
 * Module dependencies
 */
import React, { Component } from 'react';

import TicTacToeBoard from '../containers/tictactoeboard';
import WeatherWidget from '../components/weather-widget';

import Header from './partials/header';
import Footer from './partials/footer';

import wrapper from '../mixins/socket-wrapper';

import config from '../resources/config.json';

class App extends Component {
	
	get displayName() {
		return 'App';
	}
	
	static get defaultProps() {
		return {
        	className: 'view'
        };
    }
	
    render() {
		const WeatherWidgetWrapper = wrapper(WeatherWidget);
        return (
			<div {...this.props}>
				<Header />
				<TicTacToeBoard player={config.default.player1.marker} />
				<Footer><WeatherWidgetWrapper /></Footer>
			</div>
		)
    }
}

export default App;