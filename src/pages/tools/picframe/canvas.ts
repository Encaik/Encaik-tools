import { RcFile } from 'antd/es/upload';

const imgReader = (file: RcFile, callback: (img: HTMLImageElement) => void) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    const img = new Image(); // 创建Image对象
    img.src = e.target?.result as string;
    img.onload = () => {
      callback(img);
    };
  };
  reader.readAsDataURL(file);
};

export { imgReader };
