import * as React from 'react';
import { DashboardPage, HomePage, LoginPage, VerifyAccount } from 'src/pages';
import CallPage from 'src/pages/Call/Call';
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
    private: true,
    component: VerifyAccount,
  },
  {
    path: '/call',
    private: true,
    component: CallPage,
  },
  {
    path: '/dashboard',
    private: true,
    component: DashboardPage,
  },
];

export default routes;
