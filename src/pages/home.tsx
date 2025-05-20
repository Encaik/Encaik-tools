import React from 'react';
import { Button, Card, Divider, List, Typography, Tooltip } from 'antd';
import Meta from 'antd/es/card/Meta';
import Paragraph from 'antd/es/typography/Paragraph';
import Title from 'antd/es/typography/Title';
import { useNavigate } from 'react-router-dom';
import { SendOutlined, LinkOutlined } from '@ant-design/icons';

const DEFAULT_IMG = 'https://img.shields.io/badge/Encaik-Tools-blue?style=flat-square';

const tools = [
  {
    title: '照片边框',
    link: '/tools/picframe',
    img: '/tools-card/picframe.png',
    description:
      '为相机照片添加精致边框和水印，自动生成相机型号、拍摄参数等信息，彰显摄影师风格与技术细节。',
    isExternal: false,
  },
  {
    title: '简谱编辑工具',
    link: 'https://simple-notation.vercel.app/',
    img: '',
    description: '在线简谱编辑与渲染，支持多种乐谱格式，适合音乐爱好者和教师。',
    isExternal: true,
  },
  {
    title: '口琴谱（施工中）',
    link: '/tools/harmonica',
    img: '',
    description: '口琴谱生成与渲染工具，助力口琴学习与创作。',
    isExternal: false,
  },
  {
    title: 'WebGpu',
    link: '/tools/webgpu',
    img: '',
    description: 'WebGPU 图形渲染实验工具，探索前沿 Web 图形技术。',
    isExternal: false,
  },
  {
    title: '博客',
    link: 'https://encaik.top/',
    img: '',
    description: '作者博客，记录开发心得与技术分享。',
    isExternal: true,
  },
  {
    title: '照片调色',
    link: '/tools/photo-curve',
    img: '',
    description: '支持上传照片，左侧渲染，右侧可用风格曲线调整全通道和RGB通道色彩。',
    isExternal: false,
  },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-24 flex flex-col items-center justify-center">
      <span className="text-9xl font-bold py-48 text-center">Encaik Tools</span>
      <Divider>简介</Divider>
      <Typography>
        <Title level={4}>🚀 探索技术边界，释放创新火花 🚀</Title>
        <Paragraph>
          欢迎来到Encaik Tools——一个汇聚独特与实用开发小工具的在线平台，专为那些寻求新鲜体验和乐趣的创新者们设计。在这里，你会发现一系列精心制作的工具，它们旨在为你的日常开发工作增添一抹别样的色彩，让技术不再枯燥无味。
        </Paragraph>
        <Title level={5}>🌈 特色功能：</Title>
        <Paragraph>
          精选工具集：集合了各种用途的开发辅助工具，覆盖多个领域，让你在尝试与整活中体验技术的魅力。
          一键在线使用：无需下载安装，直接在线操作，简洁高效，随时随地满足你的需求。
          持续更新：我们的工具库定期更新，确保你总能接触到最新的工具和技术趋势。
        </Paragraph>
        <Title level={5}>💡 为何选择Encaik Tools？</Title>
        <Paragraph>
          激发灵感：每个工具背后都蕴含着独特的设计理念，它们鼓励你跳出常规，用不同的视角看待问题。
          便捷高效：一键式在线使用，减少繁琐步骤，让你快速解决问题，提高工作效率。
          轻松学习：通过实际操作，轻松掌握新技能，让学习变得轻松愉快。 🎉
        </Paragraph>
        <Paragraph>
          立即探索，让Encaik Tools成为你开发旅程中的得力伙伴！
          在这里，每一个工具都是一次全新的技术探索，等待你来发现和体验。
        </Paragraph>
      </Typography>
      <Divider>工具介绍</Divider>
      <List
        className="w-full"
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 2,
          lg: 3,
          xl: 4,
          xxl: 3,
        }}
        dataSource={tools}
        renderItem={(item) => (
          <List.Item key={item.title}>
            <Card
              className="shadow-lg hover:shadow-2xl transition-shadow duration-300"
              style={{ height: 400, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
              cover={
                <div
                  style={{
                    background: '#f0f2f5',
                    height: 180,
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderTopLeftRadius: 8,
                    borderTopRightRadius: 8,
                    overflow: 'hidden',
                  }}
                >
                  <img
                    alt="img"
                    src={item.img || DEFAULT_IMG}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      filter: item.img ? undefined : 'grayscale(1)',
                      opacity: item.img ? 1 : 0.7,
                      background: 'transparent',
                      display: 'block',
                    }}
                  />
                </div>
              }
              actions={[
                <Tooltip title={item.isExternal ? '外部链接，新开页面' : '立即使用'} key="action">
                  <Button
                    type="primary"
                    icon={item.isExternal ? <LinkOutlined /> : <SendOutlined />}
                    onClick={() => {
                      if (item.isExternal) {
                        window.open(item.link, '_blank');
                      } else {
                        navigate(item.link);
                      }
                    }}
                  >
                    立即使用
                  </Button>
                </Tooltip>,
              ]}
            >
              <Meta
                title={
                  <span>
                    {item.title}
                    {item.isExternal && <LinkOutlined style={{ marginLeft: 6, fontSize: 14, color: '#1677ff' }} />}
                  </span>
                }
                description={item.description}
              />
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
}
