import { useEffect } from 'react';
import { SimpleNotation } from 'simple-notation';

export function SnRender({ options }: { options: any }) {
  let sn: SimpleNotation | null;

  useEffect(() => {
    if (sn) return;
    const container = document.getElementById('container') as HTMLDivElement;
    sn = new SimpleNotation(container!, {
      debug: true,
    });
    const resize = () => {
      sn?.resize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', resize);

    sn.loadData(options);
    return () => {
      container?.remove();
      window.removeEventListener('resize', resize);
      sn = null;
    };
  }, []);

  // useEffect(() => {
  //   sn?.loadData(options);
  // }, [options]);

  return <div id="container" className="h-full"></div>;
}
