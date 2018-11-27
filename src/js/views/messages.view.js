'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';

import { Elements, renderLinks } from 'libs/elements.lib';
import type { LinkItem } from 'types/common.type';

/* @flow */
type Props = {
	items: Array<LinkItem>;
	children?: Node;
};

//<Link to={`${match.url}/${n+1}`}></Link>
export default class MessagesView extends Component<Props> {
  displayName: string = 'MessagesView';

  view: ?HTMLElement;
  
  static defaultProps: Props = {
	  className: 'view',
	  items: []
  };
  
  render(): Node {
	  const { staticContext, items, children, ...rest } = this.props;
	  return (
		<Elements.View ref={view => (this.view = view)} {...rest}>
			{ renderLinks(items) }
		</Elements.View>
	  );
  }
};