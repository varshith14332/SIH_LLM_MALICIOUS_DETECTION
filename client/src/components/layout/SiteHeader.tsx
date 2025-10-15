import { Shield, Radar, Network } from "lucide-react";
import ThemeSwitch from "@/components/ThemeToggle";

const nav = [
  { to: "/verify", label: "Verify" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/threat-graph", label: "Threat Graph" },
  { to: "/audit-log", label: "Audit Log" },
  { to: "/reports", label: "Reports" },
  { to: "/knowledge", label: "Knowledge" },
  { to: "/about", label: "About" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/5 border-b border-white/10">
      <div className="container flex h-16 items-center justify-between">
        <a
          href="/"
          className="flex items-center gap-2 font-heading text-xl text-cyan-300 neon-text"
        >
          <Shield className="text-cyan-400" />
          AI Defense Intelligence
        </a>
        <nav className="hidden md:flex items-center gap-6">
          {nav.map((n) => (
            <a
              key={n.to}
              href={n.to}
              className="text-sm text-foreground/70 hover:text-foreground transition-colors"
            >
              {n.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a
            href="/verify"
            className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-md border border-white/10 bg-white/5 text-cyan-300 hover:bg-white/10 transition-colors"
          >
            <Radar className="size-4" /> Verify
          </a>
          <a
            href="/dashboard"
            className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-md border border-white/10 bg-white/5 text-purple-300 hover:bg-white/10 transition-colors"
          >
            <Network className="size-4" /> Dashboard
          </a>
          <a
            href="/auth/login"
            className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-md border border-white/10 bg-white/5 text-foreground/80 hover:bg-white/10 transition-colors"
          >
            Sign In
          </a>
          <ThemeSwitch />
        </div>
      </div>
    </header>
  );
}
