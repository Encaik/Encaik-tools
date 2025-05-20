import React, { useRef, useState, useEffect } from 'react';
import { Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadChangeParam, UploadFile, RcFile } from 'antd/es/upload';
import CurvePanel, { CurvePoints } from './curve-panel';

/**
 * 照片调色工具主页面
 * @returns {JSX.Element}
 */
export default function PhotoCurve() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasImage, setHasImage] = useState(false);
  const [imgData, setImgData] = useState<{ img: HTMLImageElement; w: number; h: number } | null>(null);
  const [canvasSize, setCanvasSize] = useState<{ w: number; h: number }>({ w: 0, h: 0 });
  const [resetSignal, setResetSignal] = useState(0);

  /**
   * 处理图片上传
   * @param {UploadChangeParam<UploadFile>} info
   */
  const handleUpload = (info: UploadChangeParam<UploadFile>) => {
    let file: RcFile | Blob | undefined;
    if (info.file.originFileObj) {
      file = info.file.originFileObj as RcFile;
    } else if (info.file instanceof Blob) {
      file = info.file;
    }
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const image = new window.Image();
        image.onload = () => {
          setHasImage(true);
          setImgData({ img: image, w: image.width, h: image.height });
          setResetSignal(Date.now());
        };
        image.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  // 监听容器或图片变化，动态计算canvas尺寸
  useEffect(() => {
    if (!imgData) return;
    const updateSize = () => {
      const container = containerRef.current;
      if (container) {
        const maxW = container.clientWidth;
        const maxH = container.clientHeight;
        const imgAspect = imgData.w / imgData.h;
        const containerAspect = maxW / maxH;
        let drawW = maxW, drawH = maxH;
        if (containerAspect > imgAspect) {
          drawH = Math.min(maxH, imgData.h);
          drawW = imgData.w * (drawH / imgData.h);
        } else {
          drawW = Math.min(maxW, imgData.w);
          drawH = imgData.h * (drawW / imgData.w);
        }
        setCanvasSize({ w: drawW, h: drawH });
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, [imgData]);

  // canvas内容绘制，依赖imgData和canvasSize
  useEffect(() => {
    if (!imgData) return;
    const canvas = canvasRef.current;
    if (canvas && canvasSize.w > 0 && canvasSize.h > 0) {
      canvas.width = canvasSize.w;
      canvas.height = canvasSize.h;
      const ctx = canvas.getContext('2d');
      ctx?.clearRect(0, 0, canvasSize.w, canvasSize.h);
      ctx?.drawImage(imgData.img, 0, 0, canvasSize.w, canvasSize.h);
    }
  }, [imgData, canvasSize]);

  // 曲线查表生成函数
  function genCurveLUT(points: { x: number; y: number }[]): number[] {
    // 生成256长度的查找表，线性插值
    const lut = new Array(256).fill(0);
    for (let i = 0; i < 256; i++) {
      const x = i / 255;
      // 找到x左右的点
      let j = 1;
      while (j < points.length && x > points[j].x) j++;
      const p0 = points[j - 1];
      const p1 = points[j] || p0;
      // 线性插值
      const t = (x - p0.x) / (p1.x - p0.x || 1e-6);
      const y = p0.y + (p1.y - p0.y) * t;
      lut[i] = Math.round(Math.max(0, Math.min(1, y)) * 255);
    }
    return lut;
  }

  // 实时应用曲线到图片
  const handleCurveChange = (newCurves: CurvePoints) => {
    if (!imgData || !canvasRef.current) return;
    const canvas = canvasRef.current;
    if (canvas.width === 0 || canvas.height === 0) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    // 重新绘制原图
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(imgData.img, 0, 0, canvas.width, canvas.height);
    // 获取像素数据
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    // 生成查找表
    const lutRGB = genCurveLUT(newCurves.rgb);
    const lutR = genCurveLUT(newCurves.r);
    const lutG = genCurveLUT(newCurves.g);
    const lutB = genCurveLUT(newCurves.b);
    // 应用曲线
    for (let i = 0; i < data.length; i += 4) {
      // 先整体RGB曲线，再分别R/G/B
      const r = lutRGB[data[i]];
      const g = lutRGB[data[i + 1]];
      const b = lutRGB[data[i + 2]];
      data[i] = lutR[r];
      data[i + 1] = lutG[g];
      data[i + 2] = lutB[b];
    }
    ctx.putImageData(imageData, 0, 0);
  };

  return (
    <div className="flex-1 flex flex-row h-full w-full p-0 m-0 min-h-0" style={{ minHeight: 0, maxHeight: '100%', overflow: 'hidden' }}>
      {/* 左侧图片canvas区 */}
      <div className="flex-1 flex flex-col items-center justify-center bg-gray-100 rounded-l-2xl p-8 min-w-0 transition-all duration-300 h-full min-h-0">
        <Upload
          showUploadList={false}
          beforeUpload={() => false}
          onChange={handleUpload}
          accept="image/*"
        >
          <Button icon={<UploadOutlined />}>上传照片</Button>
        </Upload>
        <div ref={containerRef} className="relative flex-1 w-full flex justify-center items-center mt-4" style={{maxWidth: '100%', minHeight: 0}}>
          <div className="flex items-center justify-center w-full h-full">
            <canvas
              ref={canvasRef}
              width={canvasSize.w}
              height={canvasSize.h}
              className="rounded-lg border border-gray-300 bg-white"
              style={{
                display: hasImage ? 'block' : 'none',
                maxWidth: '100%',
                maxHeight: '100%',
                width: canvasSize.w,
                height: canvasSize.h,
              }}
            />
          </div>
          {!hasImage && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 text-lg border-2 border-dashed border-gray-300 rounded-lg bg-white/80 pointer-events-none">
              <span>请上传一张照片</span>
            </div>
          )}
        </div>
      </div>
      {/* 右侧曲线调整区 */}
      <div className="w-[400px] min-w-[320px] max-w-[400px] bg-white rounded-r-2xl shadow p-6 flex flex-col items-center h-full border-l border-gray-200 transition-all duration-300 min-h-0">
        <div className="text-lg font-bold mb-4">曲线调整</div>
        <CurvePanel onCurveChange={handleCurveChange} resetSignal={resetSignal} />
      </div>
    </div>
  );
} 