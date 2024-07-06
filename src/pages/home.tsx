import { Button, Card, Divider, List, Typography } from 'antd';
import Meta from 'antd/es/card/Meta';
import Paragraph from 'antd/es/typography/Paragraph';
import Title from 'antd/es/typography/Title';
import { useNavigate } from 'react-router-dom';
import { SendOutlined } from '@ant-design/icons';

export default function Hwebgpuome() {
  const navigate = useNavigate();
  const data = [
    {
      title: '照片边框',
      link: '/tools/picframe',
      img: '/tools-card/picframe.png',
      description:
        '一款专为摄影爱好者设计的创意小工具，它不仅能够为你的相机照片添加精致边框，还能自动生成包含相机型号、拍摄参数等详细信息的水印，让你的每一张作品都讲述一个完整的故事，彰显摄影师的独特风格与技术细节。',
    },
  ];

  return (
    <div className="container mx-auto px-24 flex flex-col items-center justify-center">
      <span className="text-9xl font-bold py-48 text-center">Encaik Tools</span>
      <Divider>简介</Divider>
      <Typography>
        <Title level={4}>🚀 探索技术边界，释放创新火花 🚀</Title>

        <Paragraph>
          欢迎来到Encaik
          Tools——一个汇聚独特与实用开发小工具的在线平台，专为那些寻求新鲜体验和乐趣的创新者们设计。在这里，你会发现一系列精心制作的工具，它们旨在为你的日常开发工作增添一抹别样的色彩，让技术不再枯燥无味。
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
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <Card
              cover={<img alt="img" src={item.img} />}
              actions={[
                <Button
                  type="primary"
                  icon={<SendOutlined />}
                  onClick={() => navigate(item.link)}
                >
                  立即使用
                </Button>,
              ]}
            >
              <Meta title={item.title} description={item.description} />
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
}
