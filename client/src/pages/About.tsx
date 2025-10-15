import { motion } from 'framer-motion';

export default function About(){
  return (
    <div className="container py-10 space-y-8">
      <div className="grid gap-10 md:grid-cols-2">
        <div>
          <h2 className="font-heading text-3xl text-cyan-300">Mission & Governance</h2>
          <p className="mt-3 text-foreground/75">Our mission is to safeguard the information ecosystem against AI-amplified disinformation through transparent detection, provenance, and reporting. We collaborate with research labs and institutions to advance defenses.</p>
          <ul className="mt-4 list-disc pl-6 text-foreground/75">
            <li>Open research partnerships</li>
            <li>Privacy-first design</li>
            <li>Independent auditing</li>
          </ul>
        </div>
        <motion.form initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} className="glass neon-border rounded-2xl p-6 space-y-3" onSubmit={(e)=>e.preventDefault()}>
          <h3 className="font-heading text-xl text-foreground">Contact Us</h3>
          <input placeholder="Name" className="w-full rounded-md bg-white/5 border border-white/10 p-2 outline-none focus:ring-2 focus:ring-cyan-400" />
          <input placeholder="Email" type="email" className="w-full rounded-md bg-white/5 border border-white/10 p-2 outline-none focus:ring-2 focus:ring-cyan-400" />
          <textarea placeholder="Message" rows={5} className="w-full rounded-md bg-white/5 border border-white/10 p-2 outline-none focus:ring-2 focus:ring-cyan-400" />
          <button className="w-full rounded-md px-4 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold hover:from-cyan-400 hover:to-purple-500 transition-colors">Send</button>
          <p className="text-xs text-foreground/60">Demo-only form. No data is transmitted.</p>
        </motion.form>
      </div>
      <div className="grid gap-6 sm:grid-cols-3">
        {["Partner Labs","Cyber Units","Civic Orgs"].map((s)=> (
          <div key={s} className="glass neon-border rounded-xl p-6 text-center text-foreground/80">{s}</div>
        ))}
      </div>
    </div>
  );
}
