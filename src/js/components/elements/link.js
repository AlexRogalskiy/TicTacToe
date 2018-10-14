'use strict';

/**
 * Module dependencies
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { style, classes } from 'typestyle';
import { withRouter } from "react-router";

class Link extends Component {
  get displayName() {
    return 'Link';
  }
  
  static get propTypes() {
    return {
	   className: PropTypes.string,
	   dataClass: PropTypes.object,
       router: PropTypes.object.isRequired,
       href: PropTypes.string.isRequired
    };
  }
  
  static get defaultProps() {
    return {
	  className: 'link',
	  dataClass: { currentLinkClass: 'current-link' },
      router: {},
      href: ''
    };
  }
  
    render = () => {
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