'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
//import PropTypes from 'prop-types';
import { style, classes } from 'typestyle';
import socketIOClient from 'socket.io-client';

import LoaderElement from 'components/elements/loader.element';
import { Elements } from 'libs/elements.lib';
import Logger, { tag } from 'libs/logger.lib';

/* @flow */
type Props = {
	dataClass?: Object<any>;
	onConnect?: func;
	onDisconnect?: func;
};
type State = {
	response: Object<any>;
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

  onConnect(socket: object): func {
    return () => {
      if (this.props.onConnect) {
        this.props.onConnect(socket).call(this);
      }
      socket.on('event', this.onEvent(socket));
    };
  }

  onDisconnect(socket: object): func {
    return () => {
      if (this.props.onDisconnect) {
        this.props.onDisconnect(socket).call(this);
      }
    };
  }

  onEvent(socket: object): func {
    return data => {
      Logger.debug(
        tag`onEvent: <event> data ${data} from socket with id=${socket.id}`
      );
	  if(this._mounted) {
		this.setState({ response: data });
	  }
    };
  }
  
  componentWillUnmount(): void {
     this._mounted = false;
  }

  componentDidMount(): void {
	this._mounted = true;
	
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
      <Elements.View {...rest}>{ this.state.response }</Elements.View>
    ) : (
      <LoaderElement />
    );
    const elements = isConnected ? (
      <Elements.View className={className}>{ response }</Elements.View>
    ) : null;
    return <>{elements}</>;
  }
};
