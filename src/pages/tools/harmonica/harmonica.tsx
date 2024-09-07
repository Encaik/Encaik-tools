import { Button, Col, ConfigProvider, Layout, Row } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import TextScore from './text-score';
import ScoreRender from './score-render';
import { useState } from 'react';

export default function Harmonica() {
  const [textScore, setTextScore] = useState(`C#5/q, B4, A4, G#4
C#4/h, C#4`);

  return (
    <ConfigProvider
      theme={{
        components: {
          Layout: {
            headerBg: '#fff',
          },
        },
      }}
    >
      <Layout className="h-full w-full">
        <Header className="border-b border-solid border-gray-400">
          <Button>导入midi</Button>
        </Header>
        <Content>
          <Row className="h-full">
            <Col
              span={12}
              className="p-8 border-r border-solid border-gray-400"
            >
              <ScoreRender textScore={textScore} />
            </Col>
            <Col span={12}>
              <TextScore textScore={textScore} setTextScore={setTextScore} />
            </Col>
          </Row>
        </Content>
      </Layout>
    </ConfigProvider>
  );
}
