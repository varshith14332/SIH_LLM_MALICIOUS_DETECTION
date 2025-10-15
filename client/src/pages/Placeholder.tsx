import { motion } from "framer-motion";

export default function Placeholder({ title, description }: { title: string; description?: string }) {
  return (
    <div className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      <div className="grid-noise" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass neon-border rounded-2xl p-10 max-w-2xl text-center"
      >
        <h1 className="font-heading text-3xl md:text-4xl text-cyan-300 neon-text">{title}</h1>
        <p className="mt-4 text-foreground/70">
          {description || "This page is ready to be built. Ask to generate this section next and we'll make it production-ready."}
        </p>
      </motion.div>
    </div>
  );
}
