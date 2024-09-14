import React from 'react';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';


import PublicFeedback from './pages/PublicFeedback';

const App = () => {
  const router = createBrowserRouter([

    {
      path: "/",
      element: <PublicFeedback />,
    },

  ]);

  return (
      <RouterProvider router={router} />

  );
};

export default App;