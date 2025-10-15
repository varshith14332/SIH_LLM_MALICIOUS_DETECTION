import { useState } from 'react';

export function Login(){
  const [email,setEmail]=useState('');
  const [pwd,setPwd]=useState('');
  const onSubmit=(e:React.FormEvent)=>{e.preventDefault(); localStorage.setItem('mock_token','demo'); window.location.href='/';};
  return (
    <div className="container py-12 max-w-md">
      <form onSubmit={onSubmit} className="glass neon-border rounded-2xl p-6 space-y-3">
        <h2 className="font-heading text-2xl text-cyan-300">Sign In</h2>
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="w-full rounded-md bg-white/5 border border-white/10 p-2 outline-none focus:ring-2 focus:ring-cyan-400"/>
        <input value={pwd} onChange={e=>setPwd(e.target.value)} type="password" placeholder="Password" className="w-full rounded-md bg-white/5 border border-white/10 p-2 outline-none focus:ring-2 focus:ring-cyan-400"/>
        <select className="w-full rounded-md bg-white/5 border border-white/10 p-2"><option>Public</option><option>Researcher</option><option>Analyst</option><option>Admin</option></select>
        <button className="w-full rounded-md px-4 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold hover:from-cyan-400 hover:to-purple-500 transition-colors">Continue</button>
        <p className="text-xs text-foreground/60">Demo-only. No real authentication.</p>
      </form>
    </div>
  );
}

export function Register(){
  const onSubmit=(e:React.FormEvent)=>{e.preventDefault(); window.location.href='/auth/login';};
  return (
    <div className="container py-12 max-w-md">
      <form onSubmit={onSubmit} className="glass neon-border rounded-2xl p-6 space-y-3">
        <h2 className="font-heading text-2xl text-cyan-300">Create Account</h2>
        <input placeholder="Name" className="w-full rounded-md bg-white/5 border border-white/10 p-2 outline-none focus:ring-2 focus:ring-cyan-400"/>
        <input placeholder="Email" className="w-full rounded-md bg-white/5 border border-white/10 p-2 outline-none focus:ring-2 focus:ring-cyan-400"/>
        <input type="password" placeholder="Password" className="w-full rounded-md bg-white/5 border border-white/10 p-2 outline-none focus:ring-2 focus:ring-cyan-400"/>
        <button className="w-full rounded-md px-4 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold hover:from-cyan-400 hover:to-purple-500 transition-colors">Register</button>
        <p className="text-xs text-foreground/60">Demo-only. No real authentication.</p>
      </form>
    </div>
  );
}
