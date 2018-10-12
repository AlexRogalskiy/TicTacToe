'use strict';

/**
 * Module dependencies
 */
import React, { Component } from 'react';
import { withRouter } from 'react-router';

import TicTacToeBoard from 'app-root/containers/tictactoe-board';
import WeatherWidget from 'app-root/components/widgets/weather-widget';

import Header from 'app-root/views/partials/header';
import Footer from 'app-root/views/partials/footer';

import wrapper from 'app-root/mixins/socket-wrapper';

import config from 'app-root/resources/config.json';

const scheme = config.default.scheme;

class App extends Component {
  get displayName() {
    return 'App';
  }

  static get defaultProps() {
    return {
      className: 'view',
    };
  }

  render() {
    const WeatherWidgetWrapper = wrapper(WeatherWidget);
    const TicTacToeBoardRouterWrapper = wrapper(withRouter(TicTacToeBoard));
    const { staticContext, ...rest } = this.props;
    return (
      <div {...rest}>
        <Header />
        <TicTacToeBoardRouterWrapper player={config[scheme].player1.marker} />
        <Footer>
          <WeatherWidgetWrapper />
        </Footer>
      </div>
    );
  }
}

export default App;
