'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
//import PropTypes from 'prop-types';
import { style, classes } from 'typestyle';

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
      <div className={className}>
        <div className={containerClassName} {...rest}>
          <aside />
          <aside />
          <aside />
          <aside />
          <aside />
        </div>
      </div>
    );
  }
};
