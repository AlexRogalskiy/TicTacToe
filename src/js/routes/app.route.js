'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
import { renderRoutes } from 'react-router-config';
import Loadable from 'react-loadable';

import LoaderElement from 'components/elements/loader.element';

// views
import AppView from 'views/app.view';
import MainView from 'views/main.view';
import HomeView from 'views/home.view';
import AboutView from 'views/about.view';
import OrderView from 'views/order.view';
import ItemsView from 'views/items.view';
import ItemView from 'views/item.view';
import SubItemView from 'views/sub-item.view';
import NoMatchView from 'views/no-match.view';

/*const AsyncMainView = Loadable({
    loader: () => import('views/main.view'),
    loading: LoaderElement,
	delay: 5000
});

const AsyncHomeView = Loadable({
    loader: () => import('views/home.view'),
    loading: LoaderElement,
	delay: 5000
});

const AsyncAboutView = Loadable({
    loader: () => import('views/about.view'),
    loading: LoaderElement,
	delay: 5000
});

const AsyncOrderView = Loadable({
    loader: () => import('views/order.view'),
    loading: LoaderElement,
	delay: 5000
});

const AsyncItemsView = Loadable({
    loader: () => import('views/items.view'),
    loading: LoaderElement,
	delay: 5000
});

const AsyncItemView = Loadable({
    loader: () => import('views/item.view'),
    loading: LoaderElement,
	delay: 5000
});

const AsyncSubItemView = Loadable({
    loader: () => import('views/sub-item.view'),
    loading: LoaderElement,
	delay: 5000
});

const AsyncNoMatchView = Loadable({
    loader: () => import('views/no-match.view'),
    loading: LoaderElement,
	delay: 5000
});*/

const AppRoute = [
  {
    component: AppView,
    routes: [
      {
        path: '/',
        exact: true,
        component: MainView
      },
      {
        path: '/home',
        component: HomeView
      },
      {
        path: '/about',
        component: AboutView
      },
	  {
        path: '/order/:direction(asc|desc)',
        component: OrderView
      },
	  {
        path: '/items',
        component: ItemsView
      },
      {
        path: '/item/:id',
        component: ItemView,
        routes: [
          {
            path: '/item/:id/sub-item',
            component: SubItemView
          }
        ]
      },
	  {
        path: '*',
        component: NoMatchView
      }
    ]
  }
];

export default AppRoute;