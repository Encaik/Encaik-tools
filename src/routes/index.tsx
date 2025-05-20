import React from 'react';
import { createBrowserRouter, RouteObject } from 'react-router-dom';
import DefaultLayout from '../layouts/default';
import routesConfig from './config';

interface RouteConfig extends Omit<RouteObject, 'children'> {
  path: string;
  element?: React.ReactNode;
  children?: RouteConfig[];
}

/**
 * 递归将 routesConfig 转换为 react-router 路由对象
 */
function mapRoutes(config: RouteConfig[]): RouteObject[] {
  return config
    .filter((route) => !route.path.startsWith('http')) // 过滤外链
    .map((route) => {
      const { path, element, children } = route;
      return {
        path: path.replace(/^\//, ''), // 顶层 path 不能有 /
        element,
        children: children ? mapRoutes(children) : undefined,
      };
    });
}

const router = createBrowserRouter([
  {
    path: '',
    element: <DefaultLayout />, // 顶层 layout
    children: mapRoutes(routesConfig as RouteConfig[]),
  },
]);

export default router;
