"use client";

import { useState } from "react";
import ScanForm from "./ScanForm";
import ResultCard from "./ResultCard";

type Service = { port: number; transport: string; product: string | null; version: string | null };

type Result =
  | { unavailable: true }
  | { unavailable: false; found: false }
  | {
      unavailable: false;
      found: true;
      org: string | null;
      isp: string | null;
      country: string | null;
      city: string | null;
      hostnames: string[];
      ports: number[];
      services: Service[];
    }
  | { error: string };

export default function DeviceLookupPanel() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);

  async function handleSubmit(target: string) {
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/device-lookup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ target }),
      });
      const data = await res.json();
      setResult(data);
    } catch {
      setResult({ error: "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <ScanForm
        label="Look up what an IP exposes to the internet"
        placeholder="e.g. 8.8.8.8"
        loading={loading}
        helpText="Checks public scan data - no scanning is performed by us."
        onSubmit={handleSubmit}
      />

      {result && "error" in result && (
        <ResultCard variant="danger" title={result.error} />
      )}

      {result && "unavailable" in result && result.unavailable && (
        <ResultCard variant="info" title="Device lookups are coming soon">
          This tool is being switched on shortly - check back soon, or try the
          Port Reference tab.
        </ResultCard>
      )}

      {result && "found" in result && !result.found && (
        <ResultCard variant="safe" title="No public scan data found for this address" />
      )}

      {result && "found" in result && result.found && (
        <ResultCard
          variant={result.ports.length > 0 ? "warn" : "safe"}
          title={
            result.ports.length > 0
              ? `${result.ports.length} open port${result.ports.length === 1 ? "" : "s"} found`
              : "No open ports reported"
          }
        >
          <div className="space-y-2">
            {(result.org || result.isp) && (
              <p>
                {result.org ?? result.isp}
                {result.city || result.country
                  ? ` - ${[result.city, result.country].filter(Boolean).join(", ")}`
                  : ""}
              </p>
            )}
            {result.hostnames.length > 0 && (
              <p className="text-xs">Hostnames: {result.hostnames.join(", ")}</p>
            )}
            {result.services.length > 0 && (
              <ul className="space-y-1">
                {result.services.map((s, i) => (
                  <li key={i} className="text-xs">
                    Port {s.port}/{s.transport}
                    {s.product ? ` - ${s.product}${s.version ? ` ${s.version}` : ""}` : ""}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </ResultCard>
      )}
    </div>
  );
}
