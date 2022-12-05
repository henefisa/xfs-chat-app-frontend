import * as React from 'react';
import {
  DashboardPage,
  HomePage,
  LoginPage,
  Test,
  VerifyAccount,
} from 'src/pages';
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
    path: '/verify-account',
    component: VerifyAccount,
  },
  {
    path: '/dashboard',
    private: true,
    component: DashboardPage,
  },
  {
    path: '/rtc',
    private: false,
    component: Test,
  },
];

export default routes;
