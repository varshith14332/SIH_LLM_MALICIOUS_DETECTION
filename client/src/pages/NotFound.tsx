import { useEffect } from "react";

const NotFound = () => {
  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route");
  }, []);

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="text-center glass neon-border rounded-2xl p-10">
        <h1 className="font-heading text-5xl text-cyan-300">404</h1>
        <p className="mt-2 text-foreground/70">Page not found</p>
        <a
          href="/"
          className="mt-4 inline-block rounded-md border border-white/10 bg-white/5 px-4 py-2 text-cyan-300 hover:bg-white/10"
        >
          Return Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
