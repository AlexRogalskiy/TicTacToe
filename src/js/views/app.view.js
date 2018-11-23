'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
import { withRouter } from 'react-router';

import TicTacToeBoardContainer from 'app-root/containers/tictactoe-board.container';
import WeatherWidget from 'app-root/components/widgets/weather.widget';
//import DynamicRowListControl from 'app-root/components/controls/dynamic-row-list.control';

import StatusBar2Element from 'app-root/components/elements/statusbar2.element';

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
      <div {...rest}>
        <HeaderPartial>
			<StatusBar2Element />
		</HeaderPartial>
        <TicTacToeBoardRouterWrapper player={config[scheme].player1.marker} />
        <FooterPartial>
          <WeatherWidgetWrapper />
        </FooterPartial>
      </div>
    );
  }
};
