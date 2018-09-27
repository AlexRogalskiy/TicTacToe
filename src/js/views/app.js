"use strict";

/**
 * Module dependencies
 */
import React, { Component } from 'react';

import TicTacToeBoard from '../containers/tic-tac-toe-board';
import WeatherWidget from '../components/widgets/weather-widget';

import Header from './partials/header';
import Footer from './partials/footer';

import wrapper from '../mixins/socket-wrapper';

import config from '../resources/config.json';

const scheme = config.default.scheme;

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
		const TicTacToeBoardWrapper = wrapper(TicTacToeBoard);
        return (
			<div {...this.props}>
				<Header />
				<TicTacToeBoardWrapper player={config[scheme].player1.marker} />
				<Footer>
					<WeatherWidgetWrapper />
				</Footer>
			</div>
		)
    }
}

export default App;