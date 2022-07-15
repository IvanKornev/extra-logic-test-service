import React, { useId } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { routes } from '@constants';

export const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      {routes.map((route) => {
        const { path, element } = route;
        const ElementComponent = element;
        return (
          <Route
            path={path}
            element={<ElementComponent />}
          />
        );
      })}
    </Routes>
  </BrowserRouter>
);
