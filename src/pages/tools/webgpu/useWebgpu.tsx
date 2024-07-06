import { useEffect, useState } from 'react';
import useDevice from './useDevice';

const useWebGPU = (canvas: HTMLCanvasElement | null | undefined) => {
  const [context, setContext] = useState<GPUCanvasContext>();
  const [format, setFormat] = useState<GPUTextureFormat>('bgra8unorm');
  const { adapter, device } = useDevice();

  useEffect(() => {
    if (!canvas || !device) return;
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    const context = canvas.getContext('webgpu');
    if (!context) return;
    const preferredFormat = navigator.gpu.getPreferredCanvasFormat();
    setFormat(preferredFormat);
    context.configure({
      device,
      format: preferredFormat,
      alphaMode: 'premultiplied',
    });
    setContext(context);
  }, [canvas, device]);

  return { canvas, context, format, adapter, device };
};

export default useWebGPU;
