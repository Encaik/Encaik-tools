import { useEffect } from 'react';
import { Renderer, Stave } from 'vexflow';

export default function ScoreRender(_: { textScore: string }) {
  useEffect(() => {
    const div = document.getElementById('score-container') as HTMLDivElement;
    if (!div) return;
    let renderer: Renderer | null = new Renderer(div!, Renderer.Backends.SVG);
    const context = renderer.getContext();
    // Create a stave of width 400 at position 10, 40 on the canvas.
    const stave = new Stave(10, 10, 1600);

    // Add a clef and time signature.
    stave.addClef('treble').addTimeSignature('4/4');

    // Connect it to the rendering context and draw!
    stave.setContext(context).draw();
    return () => {
      context.clear();
      renderer = null;
    };
  }, []);

  return <div id="score-container" className="h-full"></div>;
}
