'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
//import PropTypes from 'prop-types';
import { style, classes } from 'typestyle';

import { Elements } from 'libs/elements.lib';

/* @flow */
type Props = {
	dataClass?: Object<any>;
    inline?: boolean;
};

export default class LoaderElement extends Component<Props> {
  displayName: string = 'LoaderElement';

  static defaultProps: Props = {
      className: 'loader',
      dataClass: {
        containerClass: 'loader-container',
        nestedContainerClass: 'inline',
      },
      inline: false
  };

  render(): Node {
    const { className, dataClass, inline, ...rest } = this.props;
    const containerClassName = classes(
      dataClass.containerClass,
      inline && dataClass.nestedContainerClass
    );
    return (
      <Elements.View className={className}>
        <Elements.View className={containerClassName} {...rest}>
          <Elements.Side />
          <Elements.Side />
          <Elements.Side />
          <Elements.Side />
          <Elements.Side />
        </Elements.View>
      </Elements.View>
    );
  }
};
