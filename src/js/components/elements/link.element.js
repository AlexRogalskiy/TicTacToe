'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
//import PropTypes from 'prop-types';
import { style, classes } from 'typestyle';
import { withRouter } from "react-router";

// @flow
type Props = {
	dataClass?: Object<any>,
    router: Object<any>,
	children?: Node
};

class LinkElement extends Component<Props> {
  displayName: string = 'LinkElement';
  
  static defaultProps: Props = {
	  className: 'link',
	  dataClass: { currentLinkClass: 'current-link' },
      router: {}
  };
  
    render(): Node {
        const { children, router, href, className, dataClass, ...rest } = this.props;
        const computedClassName = classes(
			className,
			dataClass.currentLinkClass && (router.pathname + router.search + router.hash) === href
		);
        return (
            <a onClick={router.redirect(href)} href={href} className={computedClassName} {...rest}>{ children }</a>
        );
    }
};

export default withRouter(LinkElement);