'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';

import { renderNavLinks } from 'libs/elements.lib';
import type { NavLinkItem } from 'types/common.type';

const MenuView = (items: Array<NavLinkItem> = []): Node => {
	items = [];
	items.push({ path: '', title: 'Home', className: 'menu-item' });
	items.push({ path: 'about', title: 'About', className: 'menu-item' });
	items.push({ path: 'items', title: 'Items', className: 'menu-item' });
	return renderNavLinks(items);
};

export default MenuView;