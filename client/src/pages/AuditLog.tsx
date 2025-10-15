import { useMemo } from 'react';
import { motion } from 'framer-motion';

const data = Array.from({length: 14}).map((_,i)=>({
  id: i+1,
  hash: (crypto?.randomUUID?.() || Math.random().toString(36).slice(2)).replace(/-/g,'').slice(0,32),
  timestamp: new Date(Date.now()-i*3600_000).toISOString(),
  source: i%2? 'Social Post':'News Article',
  model: i%3? 'roberta-fake-news':'openai-detector'
}));

export default function AuditLog(){
  const csv = useMemo(()=>{
    const headers = ['id','hash','timestamp','source','model'];
    const rows = data.map(d=> headers.map(h=> JSON.stringify((d as any)[h] ?? '')).join(','));
    return [headers.join(','), ...rows].join('\n');
  }, []);

  const downloadCSV = () => {
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'audit-log.csv'; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container py-10 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-3xl text-cyan-300">Blockchain-style Audit Log</h2>
        <div className="flex gap-2">
          <button onClick={()=>window.print()} className="rounded-md border border-white/10 bg-white/5 px-4 py-2 text-purple-300 hover:bg-white/10">Print / PDF</button>
          <button onClick={downloadCSV} className="rounded-md border border-white/10 bg-white/5 px-4 py-2 text-cyan-300 hover:bg-white/10">Export CSV</button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {data.map((d,i)=> (
          <motion.div key={d.id} initial={{opacity:0, y:8}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{delay:i*0.02}} className="glass neon-border rounded-xl p-5">
            <div className="text-xs text-foreground/60">Hash</div>
            <div className="font-mono text-sm text-foreground/90">{d.hash}</div>
            <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
              <div><span className="text-foreground/60">Timestamp</span><div>{new Date(d.timestamp).toLocaleString()}</div></div>
              <div><span className="text-foreground/60">Source</span><div>{d.source}</div></div>
              <div><span className="text-foreground/60">Model</span><div>{d.model}</div></div>
              <div><span className="text-foreground/60">Proof</span><div className="text-cyan-300">On-chain (simulated)</div></div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
