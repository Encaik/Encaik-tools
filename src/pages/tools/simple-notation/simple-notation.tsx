import { Col, ConfigProvider, Layout, Row } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { useState } from 'react';
import { SnRender } from './sn-render';
import { SnOption } from './sn-option';
import { SNData } from 'simple-notation';

export default function SimpleNotation() {
  const [snOption, setSnOption] = useState<SNData>({
    info: {
      title: '未闻花名',
      composer: '佚名',
      lyricist: '佚名',
      time: '4',
      tempo: '120',
      key: 'C',
      beat: '4',
    },
    score: `-,-,-,0/16,1/16,4/16,5/16|
5/16,6/16,6/16,6/16,6/16,6/8,6/16,6/16,5/16,5/16,5/16,5/16,5/8,5/16|
5/16,4/16,4/16,4/16,4/16,4/16,4/16,4/16,4/16,4/16,1/16,1/16,0/16,1/16,4/16,5/16|
5/16,6/16,6/16,6/16,6/16,6/16,6/16,1/16+,0/16,6/16,6/16,6/16,6/16,6/16,5/16,4/16|
5/8.,6/16,6,-,0/8,5/16,6/16|
5/8.,4/16,4,-,0/8,5/16,6/16|
5/8.,4/16,4,-,-||`,
    lyric: `----咕噜咕噜咕咕噜咕
-噜咕咕噜咕噜-咕
咕噜咕噜咕-咕噜咕
噜咕咕-噜咕噜咕咕
噜咕噜咕噜咕-噜咕
咕噜咕噜咕噜咕噜--
咕咕噜咕噜--咕噜咕
咕噜`,
  });

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
        <Content>
          <Row className="h-full">
            <Col
              span={10}
              className="p-8 h-full border-r border-solid border-gray-400"
            >
              <SnRender options={snOption} />
            </Col>
            <Col className="p-8 h-full" span={14}>
              <SnOption options={snOption} setOptions={setSnOption} />
            </Col>
          </Row>
        </Content>
      </Layout>
    </ConfigProvider>
  );
}
