import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/home';
import DefaultLayout from '../layouts/default';
import PicFrame from '../pages/tools/picframe/picframe';
import Webgpu from '../pages/tools/webgpu/webgpu';
import Harmonica from '../pages/tools/harmonica/harmonica';
import SimpleNotation from '../pages/tools/simple-notation/simple-notation';

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
          {
            path: 'harmonica',
            element: <Harmonica />,
          },
          {
            path: 'simple-notation',
            element: <SimpleNotation />,
          },
        ],
      },
    ],
  },
]);

export default router;
