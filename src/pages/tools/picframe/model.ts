export interface BorderConfig {
  model: BorderConfigItem;
  time: BorderConfigItem;
  info: BorderConfigItem;
  size: BorderConfigItem;
  logo: BorderConfigItem;
}

export interface BorderConfigItem {
  show: boolean;
  x: number;
  y: number;
  fontSize?: number;
  color?: string;
  size?: number;
}

export interface ExifData {
  // 基本信息
  Make: string; // 相机制造商
  Model: string; // 相机型号
  DateTimeOriginal: string | null; // 拍摄日期和时间
  ExposureTime: Number; // 曝光时间
  FNumber: Number; // 光圈数值
  FocalLength: string; // 焦距
  ISOSpeedRatings: number | null; // ISO感光度
  MeteringMode: string | null; // 测光模式
  ShutterSpeedValue: string | null; // 快门速度
  ExposureProgram: string | null; // 曝光程序

  // 更多EXIF标签
  Orientation: number | null; // 图像方向
  Flash: number | null; // 闪光灯状态
  ColorSpace: number | null; // 色彩空间
  ComponentsConfiguration: string | null; // 组件配置
  CompressedBitsPerPixel: number | null; // 压缩位每像素
  PixelXDimension: number | null; // 图像宽度
  PixelYDimension: number | null; // 图像高度
  DateTimeDigitized: string | null; // 数字化日期和时间
  SubsecTime: string | null; // 时间戳的小数部分
  SubsecTimeOriginal: string | null; // 原始时间戳的小数部分
  SubsecTimeDigitized: string | null; // 数字化时间戳的小数部分
}

export interface ExifNumber {
  denominator: number;
  numerator: number;
}
