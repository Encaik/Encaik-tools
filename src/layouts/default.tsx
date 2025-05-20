import React from 'react';
import { Layout, Menu, MenuProps } from 'antd';
import type { ItemType } from 'antd/es/menu/interface';
import { Content, Header } from 'antd/es/layout/layout';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import routesConfig from '../routes/config';
import { LinkOutlined } from '@ant-design/icons';

interface MenuConfig {
  path: string;
  label?: string;
  icon?: React.ReactNode;
  children?: MenuConfig[];
  isExternal?: boolean;
}

/**
 * 递归将 routesConfig 转换为 antd Menu 的 items
 */
function mapMenuItems(config: MenuConfig[], parentPath = ''): ItemType[] {
  return config.map((item) => {
    // 外链
    if (item.path.startsWith('http')) {
      return {
        key: item.path,
        icon: item.icon,
        // 外链加上小箭头标志
        label: (
          <span>
            {item.label}
            {item.isExternal && (
              <LinkOutlined style={{ marginLeft: 4, fontSize: 12 }} />
            )}
          </span>
        ),
      };
    }
    // 内部路由
    const fullPath = parentPath
      ? `${parentPath.replace(/\/$/, '')}/${item.path.replace(/^\//, '')}`
      : item.path;
    return {
      key: fullPath,
      icon: item.icon,
      label: item.label,
      children: item.children
        ? mapMenuItems(item.children, fullPath)
        : undefined,
    };
  });
}

export default function DefaultLayout() {
  const menu = mapMenuItems(routesConfig as MenuConfig[]);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  /**
   * 菜单点击事件，支持外链和内部跳转
   * @param {import('antd').MenuProps['onClick']} e
   */
  const onClick: MenuProps['onClick'] = (e) => {
    if (e.key.startsWith('http')) {
      window.open(e.key, '_blank');
    } else {
      navigate(e.key);
    }
  };

  return (
    <Layout className="w-screen h-screen bg-gray-200">
      <Header className="flex flex-row justify-start items-center bg-cyan-950 shadow-lg shadow-blue-500/30">
        <span className="text-gray-100 text-3xl font-bold">Encaik Tools</span>
        <Menu
          className="ml-20 flex-auto bg-transparent"
          onClick={onClick}
          selectedKeys={[pathname]}
          mode="horizontal"
          theme="dark"
          items={menu}
        />
      </Header>
      <Content className="p-8 overflow-auto">
        <Outlet />
      </Content>
    </Layout>
  );
}
