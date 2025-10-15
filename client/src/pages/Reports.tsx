import { motion } from 'framer-motion';

const counters = [
  { label: 'Articles Scanned', value: 20432 },
  { label: 'Detections (30d)', value: 812 },
  { label: 'Analysts Online', value: 27 },
  { label: 'Accuracy', value: 92, suffix: '%' },
];

export default function Reports(){
  return (
    <div className="container py-10 space-y-8">
      <h2 className="font-heading text-3xl text-cyan-300">Reports & Insights</h2>
      <div className="grid gap-6 md:grid-cols-4">
        {counters.map((c,i)=> (
          <motion.div key={c.label} initial={{opacity:0, y:10}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{delay:i*0.05}} className="glass neon-border rounded-xl p-6 text-center">
            <div className="text-4xl font-heading text-cyan-300">{c.value.toLocaleString()}{c.suffix||''}</div>
            <div className="text-foreground/70">{c.label}</div>
          </motion.div>
        ))}
      </div>
      <div className="glass neon-border rounded-xl p-6">
        <h3 className="text-foreground/80 mb-2">Executive Summary</h3>
        <p className="text-foreground/70">Disinformation activity shows clustered propagation around a handful of high-amplification nodes. AI-generated content constitutes an estimated 61% of flagged items this month. Recommendations include proactive verification workflows and expanded model ensembles.</p>
        <div className="mt-4 flex gap-2">
          <button onClick={()=>window.print()} className="rounded-md border border-white/10 bg-white/5 px-4 py-2 text-purple-300 hover:bg-white/10">Download PDF</button>
          <button onClick={()=>{
            const rows = [['Metric','Value'], ...counters.map(c=>[c.label, String(c.value)+(c.suffix||'')])];
            const csv = rows.map(r=>r.map(v=>JSON.stringify(v)).join(',')).join('\n');
            const blob = new Blob([csv], {type:'text/csv'});
            const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href=url; a.download='report.csv'; a.click(); URL.revokeObjectURL(url);
          }} className="rounded-md border border-white/10 bg-white/5 px-4 py-2 text-cyan-300 hover:bg-white/10">Download CSV</button>
        </div>
      </div>
    </div>
  );
}
