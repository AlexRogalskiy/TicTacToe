'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
//import PropTypes from 'prop-types';
import { style, classes } from 'typestyle';
import { withRouter } from "react-router";

type Props = {
	className?: string,
	dataClass?: object,
    router: object,
    href: string
};

class Link extends Component<Props> {
  displayName: string = 'Link';
  
  static defaultProps: Props = {
	  className: 'link',
	  dataClass: { currentLinkClass: 'current-link' },
      router: {},
      href: ''
  };
  
    render(): Node {
        const { children, router, href, className, dataClass, ...rest } = this.props;
        const computedClassName = classes(
			className,
			dataClass.currentLinkClass && (router.pathname + router.search + router.hash) === href
		);
        return (
            <a onClick={router.redirect(href)} href={href} className={computedClassName} {...rest}>{children}</a>
        );
    }
};

export default withRouter(Link);