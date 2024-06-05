import { Button, UploadProps } from 'antd';
import Upload, { RcFile } from 'antd/es/upload';
import { UploadOutlined } from '@ant-design/icons';

export default function ImgUpload(props: { onChange: (file: RcFile) => any }) {
  const uploadProps: UploadProps = {
    name: 'file',
    action: '',
    showUploadList: false,
    beforeUpload: (file) => {
      props.onChange && props.onChange(file);
      return false;
    },
  };

  return (
    <div className="h-full">
      <Upload {...uploadProps}>
        <Button icon={<UploadOutlined />}>点击上传图片</Button>
      </Upload>
    </div>
  );
}
