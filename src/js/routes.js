'use strict';

/**
 * Module dependencies
 */
import MainView from 'views/main.view';
import ItemView from 'views/item.view';
import HomeView from 'views/home.view';
import AboutView from 'views/about.view';
import ItemsView from 'views/items.view';

const loadData = () => {};

export const routes = [
  {
    path: "/",
    component: MainView,
    loadData: () => loadData()
  },
  {
    path: "/item/:id",
    component: ItemView,
    loadData: () => loadData()
  },
  {
    path: "/home",
    component: HomeView,
    loadData: () => loadData()
  },
  {
    path: "/about",
    component: AboutView,
    loadData: () => loadData()
  },
  {
    path: "/items",
    component: ItemsView,
    loadData: () => loadData()
  }
];
