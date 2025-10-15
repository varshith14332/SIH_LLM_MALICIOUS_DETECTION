import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

type Node = { id: string; x: number; y: number; label: string; risk: number };
type Edge = { from: string; to: string; weight: number };

const sampleNodes: Node[] = Array.from({length: 18}).map((_,i)=>({
  id: `N${i+1}`,
  x: Math.cos((i/18)*Math.PI*2)*200 + 300,
  y: Math.sin((i/18)*Math.PI*2)*140 + 220,
  label: i%3===0? 'Source':'Relay',
  risk: Math.random()
}));
const sampleEdges: Edge[] = Array.from({length: 24}).map((_,i)=>({ from: `N${(i%18)+1}`, to: `N${((i*5)%18)+1}`, weight: Math.random() }));

export default function ThreatGraph(){
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({x:0,y:0});
  const dragging = useRef<{id:string, dx:number, dy:number} | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(()=>{
    const el = containerRef.current;
    if(!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const next = Math.min(2.5, Math.max(0.6, scale + (e.deltaY>0?-0.1:0.1)));
      setScale(next);
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel as any);
  }, [scale]);

  const nodes = useRef<Node[]>(sampleNodes.map(n=>({...n})));

  const onMouseMove = (e: React.MouseEvent) => {
    if(!dragging.current) return;
    const arr = nodes.current;
    const i = arr.findIndex(n=>n.id===dragging.current!.id);
    if(i>=0){
      arr[i] = { ...arr[i], x: e.clientX - dragging.current.dx, y: e.clientY - dragging.current.dy };
    }
  };
  const onMouseUp = () => { dragging.current = null; };

  return (
    <div className="container py-10">
      <h2 className="font-heading text-3xl text-cyan-300 mb-4">Threat Intelligence Graph</h2>
      <div className="text-foreground/70 mb-4">Zoom with mouse wheel, drag nodes to explore propagation pathways.</div>
      <div ref={containerRef} onMouseMove={onMouseMove} onMouseUp={onMouseUp} className="relative h-[500px] rounded-2xl glass neon-border overflow-hidden">
        <div
          style={{ transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`, transformOrigin: '0 0' }}
          className="absolute inset-0"
        >
          <svg width="1000" height="800" className="absolute">
            {sampleEdges.map((e, idx)=>{
              const a = nodes.current.find(n=>n.id===e.from)!;
              const b = nodes.current.find(n=>n.id===e.to)!;
              return (
                <line key={idx} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={`rgba(0,255,255,${0.2 + e.weight*0.6})`} strokeWidth={1.5} />
              );
            })}
          </svg>
          {nodes.current.map((n)=> (
            <motion.div
              key={n.id}
              className="absolute -translate-x-1/2 -translate-y-1/2 text-xs"
              style={{ left: n.x, top: n.y }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            >
              <div
                onMouseDown={(e)=>{ dragging.current = { id: n.id, dx: e.clientX - n.x, dy: e.clientY - n.y }; }}
                className="relative w-8 h-8 rounded-full bg-white/10 border border-white/20 cursor-grab active:cursor-grabbing"
              >
                <span className="absolute inset-0 rounded-full blur-md" style={{ background: `radial-gradient(circle, rgba(0,255,255,${0.6*n.risk}) 0%, rgba(122,0,255,${0.5*(1-n.risk)}) 70%, transparent 80%)` }} />
                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-foreground/80">{n.id}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
