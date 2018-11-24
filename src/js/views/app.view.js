'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
import { withRouter } from 'react-router';

import TicTacToeBoardContainer from 'containers/tictactoe-board.container';
import WeatherWidget from 'components/widgets/weather.widget';
//import DynamicRowListControl from 'components/controls/dynamic-row-list.control';
import StatusBar2Element from 'components/elements/statusbar2.element';
import Chat2Widget from 'components/widgets/chat2.widget';

import HeaderPartial from 'views/partials/header.partial';
import FooterPartial from 'views/partials/footer.partial';

import { Elements } from 'libs/elements.lib';
import SocketWrapper from 'wrappers/socket.wrapper';
import config from 'resources/config.json';

const scheme = config.default.scheme;

/* @flow */
type Props = {
	children?: Node;
};

export default class AppView extends Component<Props> {
  displayName: string = 'AppView';

  view: ?HTMLElement;
  
  static defaultProps: Props = {
	  className: 'view'
  };

  /*shouldComponentUpdate(nextProps: Object<any>, nextState: Object<any>): boolean {
		if (this.props.color !== nextProps.color) {
			return true;
		}
		if (this.state.count !== nextState.count) {
			return true;
		}
		return false;
	}*/

  render(): Node {
    const WeatherWidgetWrapper = SocketWrapper(WeatherWidget);
    const TicTacToeBoardRouterWrapper = SocketWrapper(withRouter(TicTacToeBoardContainer));
    const { staticContext, ...rest } = this.props;
    return (
      <Elements.View ref={view => (this.view = view)} {...rest}>
        <HeaderPartial>
			<StatusBar2Element />
		</HeaderPartial>
		<Chat2Widget />
        <TicTacToeBoardRouterWrapper player={config[scheme].player1.marker} />
        <FooterPartial>
          <WeatherWidgetWrapper />
        </FooterPartial>
      </Elements.View>
    );
  }
};
