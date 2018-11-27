'use strict';

/**
 * Module dependencies
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';

//import createHistory from 'history/createHashHistory';
import { createBrowserHistory } from 'history';

import style from '../css/style.css';

import AppRouter from 'routers/app.router';
import ImageContainer from 'containers/image.container';
import TicTacToeStore from 'stores/tictactoe.store';
import AppStore from 'stores/app.store';
import ImageStore from 'stores/image.store';
import registerServiceWorker from 'vendor/service/service-worker';

/* @flow */
type Props = {
	store: React.ComponentType<{}>;
	wrapper: Object<HTMLElement>;
};

const render = (MainComponent: React.ComponentType<{}>, props: Props = {}): void =>
	ReactDOM.render(
	<AppContainer>
		<Provider store={props.store}>
			<MainComponent />
		</Provider>
	</AppContainer>,
    props.wrapper
);

//const App = () => (<AppRouter history={createHistory({ queryKey: false })} />);
const App = () => (<AppRouter history={ createBrowserHistory() } />);

const wrapper = document.getElementById('root');
if (wrapper) {
	render(App, { store: AppStore, wrapper });
	//render(App, { store: TicTacToeStore, wrapper });
	//render(ImageContainer, { store: ImageStore, wrapper });
	registerServiceWorker();
}

/*import { push } from 'connected-react-router'
store.dispatch(push('/path/to/somewhere'))*/

/*
if (module.hot) {
  module.hot.accept('./App', () => {
    render()
  })
}

if (module.hot) {
  module.hot.accept('./reducers', () => {
    store.replaceReducer(rootReducer(history))
  })
}
*/