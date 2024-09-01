import React from 'react';
import Home from "./components/Home";
import { createBrowserRouter } from 'react-router-dom';
import Performance from './components/Performance';
import Transactions from './components/Transactions';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/performance",
    element: <Performance />,
  },
  {
    path: "/transactions",
    element: <Transactions />,
  },
]);