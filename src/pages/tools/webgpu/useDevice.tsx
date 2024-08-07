import { useEffect, useState } from 'react';

const useDevice = () => {
  const [adapter, setAdapter] = useState<GPUAdapter>();
  const [device, setDevice] = useState<GPUDevice>();

  useEffect(() => {
    if (navigator.gpu === undefined) return;
    const initWebGPU = async () => {
      const adapter = await navigator.gpu.requestAdapter();
      if (adapter === null) return;
      const device = await adapter.requestDevice();
      setAdapter(adapter);
      setDevice(device);

      device.lost.then(() => {
        setDevice(undefined);
      });
    };
    initWebGPU();
  }, []);

  return {
    adapter,
    device,
  };
};

export default useDevice;
