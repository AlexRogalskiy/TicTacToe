'use strict';

/**
 * Module dependencies
 */
import React, { Component, Node } from 'react';
import { renderRoutes } from 'react-router-config';

// views
import AppView from 'views/app.view';
import MainView from 'views/main.view';
import HomeView from 'views/home.view';
import AboutView from 'views/about.view';
import ItemsView from 'views/items.view';
import ItemView from 'views/item.view';
import SubItemView from 'views/sub-item.view';

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
      }
    ]
  }
];

export default AppRoute;