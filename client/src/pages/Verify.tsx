import { ChangeEvent, FormEvent, useCallback, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  Link as LinkIcon,
  ScanEye,
  ShieldCheck,
  TriangleAlert,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import type { VerifyRequest, VerifyResponse } from "@shared/api";

const initialForm: Pick<VerifyRequest, "text" | "url"> = {
  text: "",
  url: "",
};

const normalizeLabelForDisplay = (label: string) => {
  const normalized = label.toLowerCase();
  if (normalized === "fake" || normalized.includes("fake")) {
    return "Human / Real";
  }
  if (normalized === "real" || normalized.includes("real")) {
    return "AI-generated / Fake";
  }
  if (normalized === "ai-generated" || normalized.includes("ai")) {
    return "Human / Real";
  }
  if (normalized === "human" || normalized.includes("human")) {
    return "AI-generated / Fake";
  }
  return label
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

const clampPercent = (value: number) =>
  Math.round(Math.max(0, Math.min(1, value || 0)) * 100);

const Verify = () => {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<VerifyResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const badgeColor = useMemo(() => {
    if (!result) return "text-green-400";
    if (result.label === "fake") return "text-red-400";
    if (result.label === "ai-generated") return "text-purple-400";
    if (result.label === "real" || result.label === "human")
      return "text-green-400";
    return "text-cyan-300";
  }, [result]);

  const friendlyResultLabel = useMemo(() => {
    if (!result) return "";
    return normalizeLabelForDisplay(result.label);
  }, [result]);

  const probabilityEntries = useMemo(() => {
    if (!result?.probabilities)
      return [] as Array<{ key: string; label: string; value: number }>;
    return Object.entries(result.probabilities)
      .map(([key, value]) => ({
        key,
        label: normalizeLabelForDisplay(key),
        value: value || 0,
      }))
      .sort((a, b) => b.value - a.value);
  }, [result]);

  const handleChange = useCallback(
    (key: keyof VerifyRequest) =>
      (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = event.target.value;
        setForm((prev) => ({ ...prev, [key]: value }));
      },
    [],
  );

  const onSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setLoading(true);
      setError(null);
      setResult(null);

      const payload: VerifyRequest = {
        text: form.text?.trim() || undefined,
        url: form.url?.trim() || undefined,
      };

      try {
        const response = await fetch("/api/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const text = await response.text();
        let parsed: (VerifyResponse & { message?: string }) | null = null;
        try {
          parsed = text
            ? (JSON.parse(text) as VerifyResponse & { message?: string })
            : null;
        } catch {
          parsed = null;
        }

        if (!response.ok) {
          const msg =
            (parsed && parsed.message) || text || "Verification failed";
          throw new Error(msg);
        }

        if (!parsed) {
          throw new Error("Unexpected empty response");
        }

        setResult(parsed);
      } catch (submissionError) {
        const message =
          submissionError instanceof Error
            ? submissionError.message
            : "Verification failed";
        setError(message);
      } finally {
        setLoading(false);
      }
    },
    [form.text, form.url],
  );

  return (
    <div className="relative py-14">
      <div className="container grid gap-8 md:grid-cols-2 items-start">
        <form
          onSubmit={onSubmit}
          className="glass neon-border rounded-2xl p-6 space-y-4"
        >
          <h2 className="font-heading text-2xl text-cyan-300 flex items-center gap-2">
            <ScanEye className="text-cyan-400" /> Content Verification
          </h2>
          <div>
            <label className="text-sm text-foreground/70 flex items-center gap-2">
              <LinkIcon className="size-4" /> News URL (optional)
            </label>
            <input
              type="url"
              value={form.url}
              onChange={handleChange("url")}
              placeholder="https://example.com/article"
              className="mt-1 w-full rounded-md bg-white/5 border border-white/10 p-2 outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </div>
          <div>
            <label className="text-sm text-foreground/70 flex items-center gap-2">
              <Upload className="size-4" /> Paste Text
            </label>
            <textarea
              value={form.text}
              onChange={handleChange("text")}
              rows={8}
              placeholder="Paste article or social post content here"
              className="mt-1 w-full rounded-md bg-white/5 border border-white/10 p-3 outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </div>
          <button
            disabled={loading || (!form.text?.trim() && !form.url?.trim())}
            className="w-full rounded-md px-4 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold hover:from-cyan-400 hover:to-purple-500 transition-colors disabled:opacity-60"
          >
            {loading ? "Analyzing…" : "Verify Now"}
          </button>
          <p className="text-xs text-foreground/60">
            We route your request to our ML service (Hugging Face models) via a
            secure backend.
          </p>
        </form>
        <div className="min-h-[320px]">
          <AnimatePresence mode="wait">
            {loading && (
              <motion.div
                key="loading"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="glass neon-border rounded-2xl p-6 flex flex-col items-center justify-center gap-4"
              >
                <div className="relative">
                  <div className="size-28 rounded-full border-2 border-cyan-400/40 animate-pulse" />
                  <div className="absolute inset-2 rounded-full border-2 border-purple-500/40 animate-[spin_2s_linear_infinite]" />
                  <div className="absolute inset-6 rounded-full border-2 border-cyan-400/30 animate-[spin_3s_linear_infinite]" />
                </div>
                <p className="text-foreground/70">Scanning content…</p>
              </motion.div>
            )}
            {!loading && error && (
              <motion.div
                key="error"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="glass neon-border rounded-2xl p-6 text-red-300"
              >
                <div className="flex items-center gap-2">
                  <TriangleAlert /> {error}
                </div>
              </motion.div>
            )}
            {!loading && result && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="glass neon-border rounded-2xl p-6 space-y-4"
              >
                <div
                  className={`font-heading text-2xl ${badgeColor} flex items-center gap-2`}
                >
                  <ShieldCheck />{" "}
                  {friendlyResultLabel || result.label.toUpperCase()}
                </div>
                <div>
                  <div className="text-sm text-foreground/70">Confidence</div>
                  <Progress
                    value={clampPercent(result.confidence)}
                    className="h-3"
                  />
                </div>
                {probabilityEntries.length > 0 && (
                  <div className="space-y-2">
                    {probabilityEntries.map(({ key, label, value }) => (
                      <div key={key}>
                        <div className="text-xs text-foreground/60">
                          {label}
                        </div>
                        <Progress value={clampPercent(value)} className="h-2" />
                      </div>
                    ))}
                  </div>
                )}
                {result.reason && (
                  <p className="text-sm text-foreground/80">
                    <span className="text-foreground/60">Reason:</span>{" "}
                    {result.reason}
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Verify;
