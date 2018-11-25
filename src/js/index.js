'use strict';

/**
 * Module dependencies
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import style from '../css/style.css';

import AppRouter from 'routers/app.router';
import ImageContainer from 'containers/image.container';
import TicTacToeStore from 'stores/tictactoe.store';
import ImageStore from 'stores/image.store';
import registerServiceWorker from 'vendor/service/service-worker';

/* @flow */
type Props = {
	store: React.ComponentType<{}>;
	wrapper: HTMLElement;
};

const render = (MainComponent: React.ComponentType<{}>, props: Props = {}): void =>
	ReactDOM.render(
    <Provider store={props.store}>
		<MainComponent />
    </Provider>,
    props.wrapper
);

const wrapper = document.getElementById('root');
if (wrapper) {
	//render(AppRouter, { store: TicTacToeStore, wrapper });
	render(ImageContainer, { store: ImageStore, wrapper });
	registerServiceWorker();
}
