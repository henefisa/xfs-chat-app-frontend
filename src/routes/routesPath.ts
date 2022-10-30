import * as React from 'react';
import { DashboardPage, HomePage, LoginPage } from 'src/pages';
import Register from 'src/pages/Register/Register';

interface IRoute {
  path: string;
  private?: boolean;
  component: React.FC;
}

const routes: IRoute[] = [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/login',
    component: LoginPage,
  },
  {
    path: '/register',
    component: Register,
  },
  {
    path: '/dashboard',
    private: true,
    component: DashboardPage,
  },
];

export default routes;
