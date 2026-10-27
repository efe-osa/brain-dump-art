import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronDown, ChevronUp, Search, Square, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface Recommendation {
  id: string;
  kind: string;
  title: string;
  url: string;
  reason: string;
}

const PortfolioFinder = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState("");
  const [results, setResults] = useState<Recommendation[]>([]);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const abortRef = useRef<AbortController | null>(null);
  useEffect(() => () => abortRef.current?.abort(), []);

  const search = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!query.trim() || loading) return;
    const controller = new AbortController();
    abortRef.current = controller;
    setLoading(true); setError(""); setResults([]); setSummary("");
    setStatus("Finding relevant work and writing…");
    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/portfolio-recommendations`, {
        method: "POST", signal: controller.signal,
        headers: { "Content-Type": "application/json", apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY },
        body: JSON.stringify({ query }),
      });
      if (!response.ok) {
        const failure = await response.json();
        throw new Error(failure.error ?? "Recommendations are unavailable right now.");
      }
      const reader = response.body?.getReader();
      if (!reader) throw new Error("No response was received. Please try again later.");
      const decoder = new TextDecoder();
      let buffer = "";
      let received = false;
      while (true) {
        const { done, value } = await reader.read();
        buffer += decoder.decode(value, { stream: !done });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";
        for (const line of lines) {
          if (!line.trim()) continue;
          const item = JSON.parse(line);
          if (item.type === "error") throw new Error(item.message);
          if (item.type === "result") {
            received = true;
            setSummary(item.summary); setResults(item.recommendations);
            setStatus(item.recommendations.length ? `${item.recommendations.length} recommendations found.` : "No close matches found.");
          }
        }
        if (done) break;
      }
      if (!received) throw new Error("No recommendations were received. Please try again later.");
    } catch (failure) {
      if (controller.signal.aborted) setStatus("Search stopped.");
      else { setError(failure instanceof Error ? failure.message : "Search is unavailable right now."); setStatus(""); }
    } finally { setLoading(false); abortRef.current = null; }
  };

  return (
    <section id="find-work" aria-labelledby="finder-heading" className="py-6 border-y border-border bg-muted/40 [overflow-wrap:anywhere]">
      <div className="page-shell page-shell--read">
        <Collapsible open={open} onOpenChange={setOpen}>
          <h2 id="finder-heading">
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="w-full justify-between gap-3 h-auto min-h-11 px-0 py-2 whitespace-normal text-left hover:bg-transparent hover:text-primary-strong">
                <span className="flex items-center gap-3"><Sparkles className="h-4 w-4 shrink-0 text-primary-strong" aria-hidden="true" /> Find work that fits your interests</span>
                {open ? <ChevronUp aria-hidden="true" /> : <ChevronDown aria-hidden="true" />}
              </Button>
            </CollapsibleTrigger>
          </h2>
          <CollapsibleContent className="pt-6 pb-2">
        <form onSubmit={search} className="space-y-4">
          <label htmlFor="portfolio-query" className="block text-sm font-medium">Your interests or the challenge you’re working on</label>
          <Textarea id="portfolio-query" value={query} onChange={event => setQuery(event.target.value)} maxLength={1000} required
            disabled={loading} aria-describedby="finder-privacy" placeholder="I’m looking for React projects with maps, or writing for someone starting web development…"
            className="font-read text-lg leading-relaxed min-h-28" />
          <div className="flex flex-wrap items-center gap-3">
            <Button type="submit" size="lg" disabled={loading || !query.trim()} className="px-5 h-auto min-h-11 max-w-full whitespace-normal"><Search aria-hidden="true" />{loading ? "Finding matches…" : "Find relevant work"}</Button>
            {loading && <Button type="button" variant="outline" size="lg" onClick={() => abortRef.current?.abort()}><Square aria-hidden="true" /> Stop</Button>}
          </div>
          <p id="finder-privacy" className="text-xs text-muted-foreground leading-relaxed">Powered by Lovable AI · Your request is sent for AI processing. Please leave out private information.</p>
        </form>
        <p role="status" aria-live="polite" className="text-sm text-muted-foreground mt-4">{status}</p>
        {error && <p role="alert" className="mt-4 text-foreground border-l-2 border-primary-strong pl-4 font-read">{error}</p>}
        {summary && <div className="mt-6">
          <p className="font-read text-lg leading-relaxed mb-4">{summary}</p>
          <ul className="divide-y divide-border border-y border-border">
            {results.map(item => <li key={item.id} className="py-5">
              <p className="text-xs uppercase text-primary-strong mb-2">{item.kind === "project" ? "Project" : "Writing"}</p>
              <a href={item.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-start gap-2 font-semibold text-foreground hover:underline underline-offset-4">
                {item.title}<ArrowUpRight className="h-4 w-4 shrink-0 mt-1" aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span>
              </a>
              <p className="font-read text-base leading-relaxed text-muted-foreground mt-2">{item.reason}</p>
            </li>)}
          </ul>
        </div>}
          </CollapsibleContent>
        </Collapsible>
      </div>
    </section>
  );
};

export default PortfolioFinder;