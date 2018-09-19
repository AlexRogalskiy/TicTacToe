import React, { Component } from 'react';
import { BrowserRouter, Router, Route } from 'react-router-dom';

import Board from '../components/board';
import Header from './particles/header';
import Footer from './particles/footer';
import TicTacToeBoard from '../containers/tictactoeboard';

const LoggerMixin = {
	log: function(message) {
		console.log(message);
	},
	componentWillMount: function() {
		this.log('componentWillMount: Mixin1');
	}
};

class AppView extends Component {
	mixins: [ LoggerMixin ]
    render() {
        return (
				<div>
					<Header />
					<TicTacToeBoard player="X" {...this.props} />
					<Footer />
				</div>
		)
    }
}
//<Route exact path="/" component={Board}/>
export default AppView;