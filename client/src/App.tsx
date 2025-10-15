import "./global.css";

import { createRoot } from "react-dom/client";
import React, { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Verify from "./pages/Verify";
import Dashboard from "./pages/Dashboard";
import ThreatGraph from "./pages/ThreatGraph";
import AuditLog from "./pages/AuditLog";
import Reports from "./pages/Reports";
import Knowledge from "./pages/Knowledge";
import About from "./pages/About";
import { Login, Register } from "./pages/auth";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ScrollTop } from "@/components/ScrollTop";

const queryClient = new QueryClient();

function RouterView({ path }: { path: string }) {
  switch (path) {
    case "/":
      return <Index />;
    case "/verify":
      return <Verify />;
    case "/dashboard":
      return <Dashboard />;
    case "/threat-graph":
      return <ThreatGraph />;
    case "/audit-log":
      return <AuditLog />;
    case "/reports":
      return <Reports />;
    case "/knowledge":
      return <Knowledge />;
    case "/about":
      return <About />;
    case "/auth/login":
      return <Login />;
    case "/auth/register":
      return <Register />;
    default:
      return <NotFound />;
  }
}

const App = () => {
  const [path, setPath] = useState<string>(window.location.pathname);

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    const onLink = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const anchor = (target.closest &&
        target.closest("a")) as HTMLAnchorElement | null;
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (
        !href ||
        href.startsWith("http") ||
        href.startsWith("mailto:") ||
        href.startsWith("#")
      )
        return;
      e.preventDefault();
      window.history.pushState({}, "", href);
      setPath(window.location.pathname);
    };

    window.addEventListener("popstate", onPop);
    document.addEventListener("click", onLink);
    return () => {
      window.removeEventListener("popstate", onPop);
      document.removeEventListener("click", onLink);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-dvh bg-gradient-to-br from-background via-background to-background relative">
        <SiteHeader />
        <main>
          <RouterView path={path} />
        </main>
        <ScrollTop />
        <a
          href="/about"
          className="fixed bottom-6 right-6 rounded-full px-4 py-3 border border-white/10 bg-white/5 text-cyan-200 hover:bg-white/10 transition-colors shadow-lg"
        >
          Contact / Chat
        </a>
      </div>
    </QueryClientProvider>
  );
};

createRoot(document.getElementById("root")!).render(<App />);
