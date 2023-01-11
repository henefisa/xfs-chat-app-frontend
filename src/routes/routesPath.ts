import * as React from 'react';
import { DashboardPage, HomePage, LoginPage, VerifyAccount } from 'src/pages';
import CallPage from 'src/pages/Call/Call';
import ForgotPassword from 'src/pages/ForgotPassword/ForgotPassword';
import Register from 'src/pages/Register/Register';
import ResetPassword from 'src/pages/ResetPassword/ResetPassword';

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
  {
    path: '/settings',
    private: true,
    component: DashboardPage,
  },
  { path: '/forgot-password', component: ForgotPassword },
  { path: '/reset-password/:id', component: ResetPassword },
];

export default routes;
