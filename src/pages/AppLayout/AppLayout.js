import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../layout/Header/Header';

const AppLayout = () => (
  <>
    <Header />
    <main>
      <Outlet />
    </main>
  </>
);

export default AppLayout;
