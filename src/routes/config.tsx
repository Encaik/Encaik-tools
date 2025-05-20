import React from 'react';
import {
  HomeFilled,
  ProductFilled,
  BookFilled,
  CameraFilled,
  ExperimentFilled,
  SignatureFilled,
  CustomerServiceFilled,
} from '@ant-design/icons';
import Home from '../pages/home';
import PicFrame from '../pages/tools/picframe/picframe';
import Webgpu from '../pages/tools/webgpu/webgpu';
import Harmonica from '../pages/tools/harmonica/harmonica';
import PhotoCurve from '../pages/tools/photo-curve/photo-curve';

/**
 * 路由和菜单的统一配置
 * @type {import('react-router-dom').RouteObject & { label?: string; icon?: React.ReactNode; children?: any[] }}
 */
const routesConfig = [
  {
    path: '/',
    label: '首页',
    icon: <HomeFilled />,
    element: <Home />,
  },
  {
    path: '/tools',
    label: '工具',
    icon: <ProductFilled />,
    children: [
      {
        path: 'picframe',
        label: '照片边框',
        icon: <CameraFilled />,
        element: <PicFrame />,
      },
      {
        path: 'https://simple-notation.vercel.app/',
        label: '简谱编辑工具',
        icon: <CustomerServiceFilled />,
        isExternal: true,
      },
      {
        path: 'harmonica',
        label: '口琴谱（施工中）',
        icon: <SignatureFilled />,
        element: <Harmonica />,
      },
      {
        path: 'webgpu',
        label: 'WebGpu',
        icon: <ExperimentFilled />,
        element: <Webgpu />,
      },
      {
        path: 'photo-curve',
        label: '照片调色',
        icon: <CameraFilled />,
        element: <PhotoCurve />,
      },
    ],
  },
  {
    path: 'https://encaik.top/',
    label: '博客',
    icon: <BookFilled />,
    isExternal: true,
    // 外链不需要 element
  },
];

export default routesConfig;
