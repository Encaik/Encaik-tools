import { Collapse, CollapseProps, Form, Input } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { SNData, SNDataInfo } from 'simple-notation';

export function SnOption({
  options,
  setOptions,
}: {
  options: SNData;
  setOptions: (options: SNData) => void;
}) {
  const onValuesChange = (changedValues: any, allValues: any) => {
    setOptions({ ...options, info: allValues });
  };

  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: '乐谱信息',
      children: (
        <Form
          name="basic"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          style={{ maxWidth: 600 }}
          initialValues={options.info}
          autoComplete="off"
          onValuesChange={onValuesChange}
        >
          <Form.Item<SNDataInfo> label="歌名" name="title">
            <Input />
          </Form.Item>
          <Form.Item<SNDataInfo> label="调号" name="key">
            <Input />
          </Form.Item>
          <Form.Item<SNDataInfo> label="拍数" name="beat">
            <Input />
          </Form.Item>
          <Form.Item<SNDataInfo> label="拍号" name="time">
            <Input />
          </Form.Item>
          <Form.Item<SNDataInfo> label="速度" name="tempo">
            <Input />
          </Form.Item>
          <Form.Item<SNDataInfo> label="作曲" name="composer">
            <Input />
          </Form.Item>
          <Form.Item<SNDataInfo> label="作词" name="lyricist">
            <Input />
          </Form.Item>
        </Form>
      ),
    },
    {
      key: '2',
      label: '简谱内容',
      children: (
        <TextArea
          value={options.score}
          onChange={(e) => setOptions({ ...options, score: e.target.value })}
          rows={4}
          autoSize
        />
      ),
    },
    {
      key: '3',
      label: '歌词内容',
      children: (
        <TextArea
          value={options.lyric}
          onChange={(e) => setOptions({ ...options, lyric: e.target.value })}
          rows={4}
          autoSize
        />
      ),
    },
  ];

  return (
    <div className="h-full overflow-auto">
      <Collapse items={items} defaultActiveKey={['1', '2', '3']} />
    </div>
  );
}
