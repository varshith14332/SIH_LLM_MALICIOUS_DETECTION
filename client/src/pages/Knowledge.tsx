import { motion } from 'framer-motion';

const posts = [
  { title: 'Understanding AI-Generated Disinformation', tag: 'Guide' },
  { title: 'Blockchain-style Audit Trails for Integrity', tag: 'Forensics' },
  { title: 'Ensembling HF Models for Robust Detection', tag: 'ML' },
  { title: 'Case Study: Coordinated Inauthentic Networks', tag: 'Case Study' },
  { title: 'Operational Playbook for Analysts', tag: 'Ops' },
  { title: 'Evaluating Detectors: Metrics & Pitfalls', tag: 'Research' },
];

export default function Knowledge(){
  return (
    <div className="container py-10">
      <h2 className="font-heading text-3xl text-cyan-300 mb-6">Knowledge Hub</h2>
      <div className="grid gap-6 md:grid-cols-3">
        {posts.map((p,i)=> (
          <motion.article key={p.title} initial={{opacity:0, y:12}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{delay:i*0.05}} className="glass neon-border rounded-2xl p-6">
            <div className="text-xs text-foreground/60">{p.tag}</div>
            <h3 className="mt-1 font-heading text-xl text-foreground">{p.title}</h3>
            <p className="mt-2 text-foreground/70">Tap into curated resources on adversarial content, provenance, and resilient pipelines.</p>
            <button className="mt-4 rounded-md border border-white/10 bg-white/5 px-3 py-2 text-cyan-300 hover:bg-white/10">Read</button>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
