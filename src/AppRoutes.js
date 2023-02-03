import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { HomePage, AppLayout, SearchPage, ErrorPage, BookPage } from './pages';

const AppRoutes = () => (
  <Routes>
    <Route path="/my-reads-app" element={<AppLayout />}>
      <Route index element={<HomePage />} />
      <Route path="/my-reads-app/book/:bookId" element={<BookPage />} />
      <Route path="/my-reads-app/search" element={<SearchPage />} />
    </Route>
    <Route path="/*" element={<ErrorPage />} />
  </Routes>
);

export default AppRoutes;
