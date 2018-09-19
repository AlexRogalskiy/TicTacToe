import React, { Component } from 'react';
import { BrowserRouter, Router, Route } from 'react-router-dom';

import Board from '../components/board';
import Header from './particles/header';
import Footer from './particles/footer';

class AppView extends Component {
    render() {
        return (
			<Router>
				<div>
					<Header />
					<Route exact path="/" component={Board}/>
					<Footer />
				</div>
			</Router>
		)
    }
}

export default AppView;