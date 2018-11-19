'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
//import PropTypes from 'prop-types';
import { style, classes } from 'typestyle';
import socketIOClient from 'socket.io-client';

import LoaderElement from 'app-root/components/elements/loader.element';
import Logger, { tag } from 'app-root/libs/logger.lib';

type Props = {
	dataClass?: object,
	onConnect?: func,
	onDisconnect?: func
};
type State = {
	response: object
};

export default class WeatherWidget extends Component<Props, State> {
  displayName: string = 'WeatherWidget';

  state: State = {
	  response: null
  };
  
  static defaultProps: Props = {
	 className: 'weather-widget',
     dataClass: { weatherWidgetInfo: 'weather-widget-info' }
  };

  onConnect(socket: object): void {
    return () => {
      if (this.props.onConnect) {
        this.props.onConnect(socket).call(this);
      }
      socket.on('event', this.onEvent(socket));
    };
  }

  onDisconnect(socket: object): void {
    return () => {
      if (this.props.onDisconnect) {
        this.props.onDisconnect(socket).call(this);
      }
    };
  }

  onEvent(socket: object): void {
    return data => {
      Logger.debug(
        tag`onEvent: <event> data ${data} from socket with id=${socket.id}`
      );
      this.setState({ response: data });
    };
  }

  componentDidMount(): void {
    const socket = socketIOClient(this.props.endpoint);
    socket.on('connect', this.onConnect(socket));
    socket.on('disconnect', this.onDisconnect(socket));
  }

  render(): Node {
    const {
      className,
      dataClass,
      isConnected,
      onConnect,
      onDisconnect,
      ...rest
    } = this.props;
    rest.className = dataClass.weatherWidgetInfo;
    const response = this.state.response ? (
      <div {...rest}>{this.state.response}</div>
    ) : (
      <LoaderElement />
    );
    const elements = isConnected ? (
      <div className={className}>{response}</div>
    ) : null;
    return <>{elements}</>;
  }
};