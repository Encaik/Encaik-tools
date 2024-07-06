import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/home';
import DefaultLayout from '../layouts/default';
import PicFrame from '../pages/tools/picframe/picframe';
import { Webgpu } from '../pages/tools/webgpu/webgpu';

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
          {
            path: 'webgpu',
            element: <Webgpu />,
          },
        ],
      },
    ],
  },
]);

export default router;
