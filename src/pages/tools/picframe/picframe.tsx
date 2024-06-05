import { RcFile } from 'antd/es/upload';
import EXIF from 'exif-js';
import { useEffect, useState } from 'react';
import { BorderConfig, BorderConfigItem, ExifData } from './model';
import ImgUpload from './components/img-upload';
import { fabric } from 'fabric';
import { Canvas, Group } from 'fabric/fabric-impl';
import BorderConfigPanel from './components/border-config-panel';
import { imgReader } from './canvas';

export default function PicFrame() {
  const [fileInfo, setFileInfo] = useState<HTMLImageElement>();
  const [fileExif, setFileExif] = useState<ExifData>();
  const [canvas, setCanvas] = useState<Canvas | null>(null);
  const [borderGroup, setBorderGroup] = useState<Group | null>(null);

  // 初始化画布
  useEffect(() => {
    const canvas = document.getElementById(
      'pic-container',
    ) as HTMLCanvasElement;
    const { width, height } = canvas.getBoundingClientRect();
    setCanvas(
      new fabric.Canvas(canvas, {
        width,
        height,
      }),
    );
  }, []);

  // 上传图片
  const onImgUpload = (file: RcFile) => {
    imgReader(file, (img: HTMLImageElement) => {
      setFileInfo(img);
    });
  };

  // 当图片上传成功时，清空画布，重置缩放，并开始绘制
  useEffect(() => {
    if (!fileInfo) return;
    canvas?.clear().renderAll();
    canvas?.setZoom(1);
    drawImage(fileInfo);
  }, [fileInfo]);

  // 绘制内容
  const drawImage = ($el: HTMLImageElement) => {
    if (!canvas) return;
    const canvasWidth = canvas.getWidth();
    const canvasHeight = canvas.getHeight();
    const image = new fabric.Image($el, {
      left: 0,
      top: 0,
      width: $el.naturalWidth,
      height: $el.naturalHeight,
    });
    const border = drawBorder({
      left: 0,
      top: $el.naturalHeight,
      width: $el.naturalWidth,
      height:
        120 /
        Math.min(
          canvasWidth / $el.naturalWidth,
          canvasHeight / $el.naturalHeight,
        ),
    });
    const dist = new fabric.Group([image, border], {
      evented: false,
      selectable: false,
      hasControls: false,
      hasBorders: false,
    });
    canvas.add(dist);
    const scale = Math.min(
      canvasWidth / dist.width!,
      canvasHeight / dist.height!,
    );
    canvas.setZoom(scale);
    const left = (canvasWidth / scale - dist.width!) / 2;
    const top = (canvasHeight / scale - dist.height!) / 2;
    dist.set({
      left,
      top,
    });
    setBorderGroup(() => {
      getExifData($el);
      return border;
    });
    canvas.renderAll();
  };

  const drawBorder = (params: any) => {
    const base = new fabric.Rect({
      ...params,
      fill: '#fff',
      selectable: true,
      hasControls: true,
      hasBorders: true,
    });
    return new fabric.Group([base]);
  };

  // 获取exif数据
  const getExifData = (el: HTMLImageElement) => {
    // @ts-ignore
    EXIF.getData(el, () => {
      setFileExif(EXIF.getAllTags(el));
    });
  };

  const [borderConfig, setBorderConfig] = useState<BorderConfig>({
    model: {
      show: true,
      x: 45,
      y: 30,
      fontSize: 24,
      color: '#000',
    },
    time: {
      show: true,
      x: 45,
      y: 50,
      fontSize: 18,
      color: '#555',
    },
    info: {
      show: true,
      x: 500,
      y: 35,
      fontSize: 18,
      color: '#555',
    },
    size: {
      show: true,
      x: 500,
      y: 50,
      fontSize: 18,
      color: '#555',
    },
    logo: {
      show: true,
      x: 320,
      y: 35,
      size: 40,
    },
  });

  const drawText = (str: string, config: BorderConfigItem, group: Group) => {
    const scale = canvas!.getZoom();
    return new fabric.Text(str, {
      left: group.group?.left! + config.x / scale,
      top: fileInfo?.naturalHeight! + config.y / scale,
      fontSize: config.fontSize, // 字体大小
      fill: config.color, // 文本颜色
      scaleX: 1 / scale,
      scaleY: 1 / scale,
    });
  };

  // 使用exif数据绘制文本
  useEffect(() => {
    if (!fileExif || !canvas) return;
    const scale = canvas.getZoom();
    if (borderConfig.model.show) {
      borderGroup!.addWithUpdate(
        drawText(fileExif.Model || '', borderConfig.model, borderGroup!),
      );
    }
    if (borderConfig.time.show) {
      borderGroup!.addWithUpdate(
        drawText(
          fileExif.DateTimeOriginal || '',
          borderConfig.time,
          borderGroup!,
        ),
      );
    }
    if (borderConfig.info.show) {
      const infoStr = `f${fileExif.FNumber} 1/${1 / Number(fileExif.ExposureTime)} ISO${fileExif.ISOSpeedRatings}`;
      borderGroup!.addWithUpdate(
        drawText(infoStr, borderConfig.info, borderGroup!),
      );
    }
    if (borderConfig.size.show) {
      const sizeStr = `${fileExif.PixelXDimension} x ${fileExif.PixelYDimension}`;
      borderGroup!.addWithUpdate(
        drawText(sizeStr, borderConfig.size, borderGroup!),
      );
    }
    if (borderConfig.logo.show) {
      let url = '';
      switch (fileExif.Make) {
        case 'NIKON CORPORATION':
          url = '/public/nikon-logo.svg';
          break;
      }
      fabric.loadSVGFromURL('/public/nikon-logo.svg', (objects, options) => {
        const svgInstance = fabric.util.groupSVGElements(objects, options);
        svgInstance.left =
          borderGroup?.group?.left! + borderConfig.logo.x / scale;
        svgInstance.top =
          fileInfo?.naturalHeight! + borderConfig.logo.y / scale;
        svgInstance.width = svgInstance.height =
          borderConfig.logo.size! / scale;
        borderGroup!.addWithUpdate(svgInstance);
        canvas.renderAll();
      });
    }
    canvas.renderAll();
    return () => {
      borderGroup?.getObjects().forEach((i) => {
        if (i instanceof fabric.Text || i instanceof fabric.Group) {
          borderGroup.remove(i);
        }
      });
    };
  }, [fileExif, borderConfig]);

  return (
    <div className="flex flex-col">
      <div className="mb-4 flex flex-row items-center gap-4">
        <span className="text-2xl font-bold">边框工具</span>
        <ImgUpload onChange={onImgUpload} />
      </div>
      <div className="flex flex-auto flex-row gap-4">
        <div className="flex-1 p-4 border border-gray-300 bg-slate-200 rounded-lg flex flex-col items-center justify-center">
          <canvas id="pic-container" className="w-full h-full"></canvas>
        </div>
        <div className="w-72 flex-initial overflow-auto">
          <BorderConfigPanel
            borderConfig={borderConfig}
            setBorderConfig={setBorderConfig}
          ></BorderConfigPanel>
        </div>
      </div>
    </div>
  );
}
