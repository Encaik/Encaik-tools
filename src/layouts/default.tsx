import { Layout, Menu, MenuProps } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  HomeFilled,
  ProductFilled,
  BookFilled,
  CameraFilled,
  ExperimentFilled,
} from '@ant-design/icons';

export default function DefaultLayout() {
  const menu = [
    {
      key: '/',
      icon: <HomeFilled />,
      label: '首页',
    },
    {
      key: '/tools',
      icon: <ProductFilled />,
      label: '工具',
      children: [
        {
          key: '/tools/picframe',
          icon: <CameraFilled />,
          label: '照片边框',
        },
        {
          key: '/tools/webgpu',
          icon: <ExperimentFilled />,
          label: 'WebGpu',
        },
      ],
    },
    {
      key: 'https://encaik.top/',
      icon: <BookFilled />,
      label: '博客',
    },
  ];

  const navigate = useNavigate();
  const { pathname } = useLocation();

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
