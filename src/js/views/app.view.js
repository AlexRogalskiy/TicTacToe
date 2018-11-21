'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
import { withRouter } from 'react-router';

import TicTacToeBoardContainer from 'app-root/containers/tictactoe-board.container';
import WeatherWidget from 'app-root/components/widgets/weather.widget';
import BasicButton from 'app-root/components/controls/basic-button.control';

import HeaderPartial from 'app-root/views/partials/header.partial';
import FooterPartial from 'app-root/views/partials/footer.partial';

import SocketWrapper from 'app-root/wrappers/socket.wrapper';

import config from 'app-root/resources/config.json';

const scheme = config.default.scheme;

export default class AppView extends Component<{}> {
  displayName: string = 'AppView';
 
  static defaultProps: Props = {
	  className: 'view'
  };

  render(): Node {
    const WeatherWidgetWrapper = SocketWrapper(WeatherWidget);
    const TicTacToeBoardRouterWrapper = SocketWrapper(withRouter(TicTacToeBoardContainer));
    const { staticContext, ...rest } = this.props;
    return (
      <div {...rest}>
        <HeaderPartial />
        <TicTacToeBoardRouterWrapper player={config[scheme].player1.marker} />
        <FooterPartial>
          <WeatherWidgetWrapper />
        </FooterPartial>
      </div>
    );
  }
};
