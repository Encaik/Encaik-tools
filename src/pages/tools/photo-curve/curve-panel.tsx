import React, { useState, useRef, useEffect } from 'react';
import { Tabs, message } from 'antd';

/**
 * 曲线通道类型
 */
const CHANNELS = [
  { key: 'rgb', label: 'RGB', color: '#fff', labelColor: '#222', tabBg: '#fff', tabText: '#222' },
  { key: 'r', label: 'R', color: '#f44' },
  { key: 'g', label: 'G', color: '#4c4' },
  { key: 'b', label: 'B', color: '#44f' },
];

export type CurvePoints = { [key: string]: { x: number; y: number }[] };

interface CurvePanelProps {
  onCurveChange?: (curves: CurvePoints) => void;
  resetSignal?: number;
}

const DEFAULT_POINTS = [ { x: 0, y: 0 }, { x: 1, y: 1 } ];

/**
 * 曲线调整面板，参考PS样式
 */
export default function CurvePanel({ onCurveChange, resetSignal }: CurvePanelProps) {
  const [channel, setChannel] = useState('rgb');
  // 四通道独立曲线
  const [curves, setCurves] = useState<CurvePoints>({
    rgb: [...DEFAULT_POINTS],
    r:   [...DEFAULT_POINTS],
    g:   [...DEFAULT_POINTS],
    b:   [...DEFAULT_POINTS],
  });
  const [dragIdx, setDragIdx] = useState<number | null>(null);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const width = 260;
  const height = 260;
  const padding = 24;

  // 当前通道点
  const points = curves[channel];

  // 坐标转换（y=0在底部，y=1在顶部）
  const toSvgX = (x: number) => padding + x * (width - 2 * padding);
  const toSvgY = (y: number) => padding + (1 - y) * (height - 2 * padding);
  const toNormX = (svgX: number) => (svgX - padding) / (width - 2 * padding);
  const toNormY = (svgY: number) => 1 - (svgY - padding) / (height - 2 * padding);

  // 平滑曲线 Catmull-Rom 样条插值
  function getSmoothPath(pts: {x:number,y:number}[]) {
    if (pts.length < 2) return '';
    let d = `M${toSvgX(pts[0].x)},${toSvgY(pts[0].y)}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i - 1] || pts[i];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = pts[i + 2] || pts[i + 1];
      // Catmull-Rom to Bezier
      const cp1x = toSvgX(p1.x + (p2.x - p0.x) / 6);
      const cp1y = toSvgY(p1.y + (p2.y - p0.y) / 6);
      const cp2x = toSvgX(p2.x - (p3.x - p1.x) / 6);
      const cp2y = toSvgY(p2.y - (p3.y - p1.y) / 6);
      d += ` C${cp1x},${cp1y} ${cp2x},${cp2y} ${toSvgX(p2.x)},${toSvgY(p2.y)}`;
    }
    return d;
  }

  // 拖拽事件
  const handlePointerDown = (idx: number) => (e: React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation(); // 防止冒泡到Tabs
    setDragIdx(idx);
    setSelectedIdx(idx);
  };
  const handlePointerMove = (e: React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation(); // 防止冒泡到Tabs
    if (dragIdx === null) return;
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const svgX = e.clientX - rect.left;
    const svgY = e.clientY - rect.top;
    let x = Math.max(0, Math.min(1, toNormX(svgX)));
    const y = Math.max(0, Math.min(1, toNormY(svgY)));
    // 拖动逻辑：
    // 端点：左端点x ∈ [0, points[1].x-0.01]，右端点x ∈ [points[n-2].x+0.01, 1]
    // 中间点：x ∈ [points[i-1].x+0.01, points[i+1].x-0.01]
    if (dragIdx === 0) x = Math.max(0, Math.min(x, points[1].x - 0.01));
    else if (dragIdx === points.length - 1) x = Math.min(1, Math.max(x, points[points.length - 2].x + 0.01));
    else {
      x = Math.max(points[dragIdx - 1].x + 0.01, Math.min(x, points[dragIdx + 1].x - 0.01));
    }
    const newPoints = points.map((p, i) => (i === dragIdx ? { x, y } : p));
    const newCurves = { ...curves, [channel]: newPoints };
    setCurves(newCurves); // 实时更新
    onCurveChange?.(newCurves); // 实时回调
  };
  const handlePointerUp = (e: React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation(); // 防止冒泡到Tabs
    setDragIdx(null);
  };

  // 点击曲线添加点
  const handleSvgClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation(); // 防止冒泡到Tabs
    if (dragIdx !== null) return;
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const svgX = e.clientX - rect.left;
    const svgY = e.clientY - rect.top;
    const x = Math.max(0, Math.min(1, toNormX(svgX)));
    const y = Math.max(0, Math.min(1, toNormY(svgY)));
    // 距离最近点太近不添加
    if (points.some(p => Math.abs(p.x - x) < 0.05)) return;
    // 插入到合适位置
    const insertIdx = points.findIndex(p => p.x > x);
    const newPoints = [
      ...points.slice(0, insertIdx),
      { x, y },
      ...points.slice(insertIdx)
    ];
    const newCurves = { ...curves, [channel]: newPoints };
    setCurves(newCurves);
    setSelectedIdx(insertIdx); // 插入后自动选中
    onCurveChange?.(newCurves);
  };

  // 选中点后Delete键删除（端点不可删）
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIdx === null) return;
      if (e.key === 'Delete' && points.length > 2 && selectedIdx > 0 && selectedIdx < points.length - 1) {
        const newPoints = points.filter((_, i) => i !== selectedIdx);
        const newCurves = { ...curves, [channel]: newPoints };
        setCurves(newCurves);
        setSelectedIdx(null);
        onCurveChange?.(newCurves);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIdx, points, curves, channel, onCurveChange]);

  // 右键重置
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation(); // 防止冒泡到Tabs
    const newCurves = { ...curves, [channel]: [...DEFAULT_POINTS] };
    setCurves(newCurves);
    setSelectedIdx(null);
    onCurveChange?.(newCurves);
    message.success('已重置当前通道曲线');
  };

  // resetSignal变化时重置所有通道曲线和内部状态
  useEffect(() => {
    setCurves({
      rgb: [...DEFAULT_POINTS],
      r:   [...DEFAULT_POINTS],
      g:   [...DEFAULT_POINTS],
      b:   [...DEFAULT_POINTS],
    });
    setChannel('rgb');
    setDragIdx(null);
    setSelectedIdx(null);
    onCurveChange?.({
      rgb: [...DEFAULT_POINTS],
      r:   [...DEFAULT_POINTS],
      g:   [...DEFAULT_POINTS],
      b:   [...DEFAULT_POINTS],
    });
  }, [resetSignal]);

  return (
    <div className="w-full flex flex-col items-center select-none" style={{userSelect:'none'}}>
      <Tabs
        activeKey={channel}
        onChange={setChannel}
        items={CHANNELS.map((c) => ({
          key: c.key,
          label: (
            <span
              style={
                c.key === 'rgb'
                  ? { color: c.tabText, background: c.tabBg, borderRadius: 4, padding: '0 8px' }
                  : { color: c.color }
              }
            >
              {c.label}
            </span>
          ),
        }))}
        className="mb-2 w-full"
        centered
      />
      <svg
        ref={svgRef}
        width={width}
        height={height}
        style={{ background: '#222', borderRadius: 8, boxShadow: '0 2px 8px #0002' }}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onClick={handleSvgClick}
        onContextMenu={handleContextMenu}
      >
        {/* 网格线 */}
        <g stroke="#444" strokeDasharray="4 2">
          {[0.25, 0.5, 0.75].map((v) => (
            <React.Fragment key={v}>
              <line x1={padding} x2={width - padding} y1={toSvgY(v)} y2={toSvgY(v)} />
              <line y1={padding} y2={height - padding} x1={toSvgX(v)} x2={toSvgX(v)} />
            </React.Fragment>
          ))}
        </g>
        {/* 边框 */}
        <rect x={padding} y={padding} width={width - 2 * padding} height={height - 2 * padding} fill="none" stroke="#888" strokeWidth={2} rx={6} />
        {/* 平滑曲线 */}
        <path
          d={getSmoothPath(points)}
          fill="none"
          stroke={CHANNELS.find((c) => c.key === channel)?.color || '#fff'}
          strokeWidth={2}
        />
        {/* 拖拽点 */}
        {points.map((p, i) => (
          <circle
            key={i}
            cx={toSvgX(p.x)}
            cy={toSvgY(p.y)}
            r={8}
            fill={selectedIdx === i ? '#ffe066' : '#fff'}
            stroke={CHANNELS.find((c) => c.key === channel)?.color || '#fff'}
            strokeWidth={2}
            style={{ cursor: 'pointer' }}
            onPointerDown={e => { e.preventDefault(); e.stopPropagation(); handlePointerDown(i)(e); }}
            onClick={e => { e.preventDefault(); e.stopPropagation(); setSelectedIdx(i); }}
          />
        ))}
      </svg>
      <div className="text-xs text-gray-400 mt-2">点击曲线添加点，选中点Delete删除，右键重置，支持RGB通道切换</div>
    </div>
  );
} 