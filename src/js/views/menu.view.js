'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';

import { Elements, renderNavLinks } from 'libs/elements.lib';
import type { NavLinkItem } from 'types/common.type';

/* @flow */
type Props = {
	items: Array<NavLinkItem>;
	children?: Node;
};

export default class MenuView extends Component<Props> {
  displayName: string = 'MenuView';

  view: ?HTMLElement;
  
  static defaultProps: Props = {
	  className: 'view',
	  items: []
  };
  
  render(): Node {
	  const { staticContext, items, children, ...rest } = this.props;
	  // props.location = { pathname: '/here', ... }
	  return (
		<Elements.View ref={view => (this.view = view)} {...rest}>
			{ renderNavLinks(items) }
		</Elements.View>
	  );
  }
};