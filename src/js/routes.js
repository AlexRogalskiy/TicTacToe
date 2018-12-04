'use strict';

/**
 * Module dependencies
 */
import MainView from 'views/main.view';
import ItemView from 'views/item.view';
import HomeView from 'views/home.view';
import AboutView from 'views/about.view';
import OrderView from 'views/order.view';
import ItemsView from 'views/items.view';
import NoMatchView from 'views/no-match.view';

import { Routes } from 'types/common.type';

const loadData = (): void => {};

export const routes: Routes = [
  {
    path: '/',
    component: MainView,
    loadData: () => loadData()
  },
  {
    path: '/item/:id',
    component: ItemView,
    loadData: () => loadData()
  },
  {
    path: '/home',
    component: HomeView,
    loadData: () => loadData()
  },
  {
    path: '/about',
    component: AboutView,
    loadData: () => loadData()
  },
  {
    path: '/order/:direction(asc|desc)',
    component: OrderView,
    loadData: () => loadData()
  },
  {
    path: '/items',
    component: ItemsView,
    loadData: () => loadData()
  },
  {
    path: '**',
    component: NoMatchView,
    loadData: () => loadData()
  }
];
