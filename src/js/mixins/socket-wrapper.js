'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
//import PropTypes from 'prop-types';

import Logger from 'app-root/libs/logger';

type Props = {
	endpoint: string
};
type State = {
	isConnected: bool
};
	
export default function wrapper<Props: {}>(WrappedComponent: React.ComponentType<Props>): React.ComponentType<Props> {
	
  return class extends Component<Props, State> {
	displayName: string = 'SocketWrapper';
	
	state: State = {
		isConnected: false
	};
	
	static defaultProps: Props = {
		endpoint: 'http://localhost:8080/'
	};

    constructor(props: Props): void {
      super(props);
      this.onConnect = this.onConnect.bind(this);
      this.onDisconnect = this.onDisconnect.bind(this);
    }

    onConnect(socket: object): func {
      return () => {
        Logger.debug(`onConnect: connected by socket with id=${socket.id}`);
        this.setState({ isConnected: true });
      };
    }

    onDisconnect(socket: object): func {
      return () => {
        Logger.debug(
          `onDisconnect: disconnected from socket with id=${socket.id}`
        );
        this.setState({ isConnected: false });
      };
    }

    render(): Node {
      return (
        <WrappedComponent
          isConnected={this.state.isConnected}
          onConnect={this.onConnect}
          onDisconnect={this.onDisconnect}
		  {...this.props}
        />
      );
    }
  };
};
