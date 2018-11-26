'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';

import { renderLinks } from 'libs/elements.lib';
import type { LinkItem } from 'types/common.type';

const MessagesView = (items: Array<LinkItem> = []): Node => (
	renderLinks(items)
);

//<Link to={`${match.url}/${n+1}`}></Link>
export default MessagesView;