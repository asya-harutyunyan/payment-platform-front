import React from 'react';
import Navbar from '../../molecules/navbar';
import { useRouterState } from '@tanstack/react-router';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const routerState = useRouterState();
  

  const noHeaderRoutes = ['/login'];
  const showHeader = !noHeaderRoutes.includes(routerState.location.pathname);

  return (
    <div>
      {showHeader && <Navbar />}
      <main>{children}</main>
    </div>
  );
};

export default Layout;
