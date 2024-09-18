import React from 'react';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';


import PublicFeedback from './pages/PublicFeedback';
import Admin from './pages/Admin';
import Navigation from './components/Navigation';
import QuestionManage from './pages/QuestionManage';
import FeedbackManage from './pages/FeedbackManage';

const App = () => {
  const router = createBrowserRouter([

    {
      path: "/",
      element: <PublicFeedback />,
    },
    {
      path: "/admin",
      element: <Admin />,
    },
    {
      path: "/nav",
      element: <Navigation />,
    },
    {
      path: "/ques",
      element: <QuestionManage />,
    },
    {
      path: "/feedback",
      element: <FeedbackManage />,
    },


  ]);

  return (
      <RouterProvider router={router} />

  );
};

export default App;