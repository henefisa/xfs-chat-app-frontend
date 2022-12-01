import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import RequireAuth from './RequireAuth';
import routes from './routesPath';

const Router: React.FC = () => {
  return (
    <Routes>
      {routes.map((item, index) => {
        const Component: React.FC = item.component;

        return (
          <Route
            key={index}
            path={item.path}
            element={
              item.private ? (
                <RequireAuth>
                  <Component />
                </RequireAuth>
              ) : (
                <Component />
              )
            }
          />
        );
      })}
    </Routes>
  );
};

export default Router;
