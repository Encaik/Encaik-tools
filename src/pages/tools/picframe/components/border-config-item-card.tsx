import { Card, Switch, Row, Col, Slider, ColorPicker } from 'antd';
import { BorderConfigItem } from '../model';

export default function BorderConfigItemCard({
  title,
  type = 'text',
  config,
  onChange,
}: {
  title: string;
  type?: 'img' | 'text';
  config: BorderConfigItem;
  onChange: (config: BorderConfigItem) => void;
}) {
  return (
    <Card
      className="mb-2"
      size="small"
      title={title}
      extra={
        <Switch
          defaultChecked
          onChange={(checked) =>
            onChange({
              ...config,
              show: checked,
            })
          }
        />
      }
    >
      <Row className="items-center mb-2">
        <Col span={6}>
          <span>x:</span>
        </Col>
        <Col span={18}>
          <Slider
            value={config.x}
            max={500}
            min={0}
            onChange={(value) =>
              onChange({
                ...config,
                x: value,
              })
            }
          />
        </Col>
      </Row>
      <Row className="items-center mb-2">
        <Col span={6}>
          <span>y:</span>
        </Col>
        <Col span={18}>
          <Slider
            value={config.y}
            max={90}
            min={0}
            onChange={(value) =>
              onChange({
                ...config,
                y: value,
              })
            }
          />
        </Col>
      </Row>
      {type === 'text' ? (
        <>
          <Row className="items-center mb-2">
            <Col span={6}>
              <span>字体大小:</span>
            </Col>
            <Col span={18}>
              <Slider
                value={config.fontSize}
                max={96}
                min={10}
                onChange={(value) =>
                  onChange({
                    ...config,
                    fontSize: value,
                  })
                }
              />
            </Col>
          </Row>
          <Row className="items-center mb-2">
            <Col span={6}>
              <span>字体颜色:</span>
            </Col>
            <Col span={18}>
              <ColorPicker
                value={config.color}
                onChange={(value) =>
                  onChange({
                    ...config,
                    color: value.toHexString(),
                  })
                }
              />
            </Col>
          </Row>
        </>
      ) : null}
      {type === 'img' ? (
        <Row className="items-center mb-2">
          <Col span={6}>
            <span>图片大小:</span>
          </Col>
          <Col span={18}>
            <Slider
              value={config.size}
              max={96}
              min={16}
              onChange={(value) =>
                onChange({
                  ...config,
                  size: value,
                })
              }
            />
          </Col>
        </Row>
      ) : null}
    </Card>
  );
}
