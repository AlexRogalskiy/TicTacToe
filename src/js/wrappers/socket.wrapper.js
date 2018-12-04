'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
//import PropTypes from 'prop-types';

import Logger from 'libs/logger.lib';

/* @flow */
type Props = {
	endpoint: string;
};
type State = {
	isConnected: boolean;
};
	
export default function SocketWrapper<Props: {}>(WrappedComponent: React.ComponentType<Props>): React.ComponentType<Props, State> {
	
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
	
	componentWillUnmount(): void {
		this._mounted = false;
	}
	
	componentDidMount(): void {
		this._mounted = true;
	}

    onConnect(socket: Object<any>): func {
      return () => {
        Logger.debug(`onConnect: connected by socket with id=${socket.id}`);
        if(this._mounted) {
			this.setState({ isConnected: true });
		}
      };
    }

    onDisconnect(socket: Object<any>): func {
      return () => {
        Logger.debug(
          `onDisconnect: disconnected from socket with id=${socket.id}`
        );
		if(this._mounted) {
			this.setState({ isConnected: false });
		}
      };
    }

    render(): Node {
      return (
        <WrappedComponent
		  wrappedComponentRef={c => (this.component = c)}
          isConnected={this.state.isConnected}
          onConnect={this.onConnect}
          onDisconnect={this.onDisconnect}
		  {...this.props}
        />
      );
    }
  };
};
