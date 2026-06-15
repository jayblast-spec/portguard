"use client";

import { useState } from "react";
import ScanForm from "./ScanForm";
import ResultCard from "./ResultCard";
import { lookupPort, PortInfo, PORT_REFERENCE } from "./portData";

type State = "initial" | "unknown" | "notfound" | PortInfo;

export default function PortReferencePanel() {
  const [result, setResult] = useState<State>("initial");

  function handleSubmit(value: string) {
    const port = parseInt(value, 10);
    if (Number.isNaN(port)) {
      setResult("unknown");
      return;
    }
    setResult(lookupPort(port) ?? "notfound");
  }

  return (
    <div className="flex flex-col gap-4">
      <ScanForm
        label="Look up what a port number means"
        placeholder="e.g. 3389"
        loading={false}
        buttonText="Look up"
        helpText="Covers the most commonly exposed ports and what to do about each."
        onSubmit={handleSubmit}
      />

      {result === "unknown" && (
        <ResultCard variant="danger" title="Enter a valid port number" />
      )}

      {result === "initial" && (
        <div className="rounded-xl border border-border bg-surface p-4 text-sm text-muted">
          <p className="font-medium text-foreground">Commonly checked ports</p>
          <ul className="mt-2 grid grid-cols-2 gap-1 text-xs sm:grid-cols-3">
            {PORT_REFERENCE.map((p) => (
              <li key={p.port}>
                {p.port} - {p.name}
              </li>
            ))}
          </ul>
        </div>
      )}

      {result === "notfound" && (
        <ResultCard variant="info" title="Port not in our reference list">
          This port isn&apos;t in our common-ports list yet - if it&apos;s open and
          you don&apos;t recognize the service, investigate before leaving it exposed.
        </ResultCard>
      )}

      {typeof result === "object" && (
        <ResultCard
          variant={result.risk === "high" ? "danger" : result.risk === "medium" ? "warn" : "safe"}
          title={`Port ${result.port} - ${result.name}`}
        >
          <p>{result.description}</p>
          <p className="mt-2 text-foreground">{result.tip}</p>
        </ResultCard>
      )}
    </div>
  );
}
