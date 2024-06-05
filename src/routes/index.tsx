import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/home';
import DefaultLayout from '../layouts/default';
import PicFrame from '../pages/tools/picframe/picframe';

const router = createBrowserRouter([
  {
    path: '',
    element: <DefaultLayout />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'tools',
        children: [
          {
            path: 'picframe',
            element: <PicFrame />,
          },
        ],
      },
    ],
  },
]);

export default router;
