"use client";

import { useState } from "react";
import ToolTabs, { TabId } from "./ToolTabs";
import DeviceLookupPanel from "./DeviceLookupPanel";
import PortReferencePanel from "./PortReferencePanel";
import CrossPromoFooter from "./CrossPromoFooter";

export default function PortGuardApp() {
  const [activeTab, setActiveTab] = useState<TabId>("ports");

  return (
    <main className="mx-auto flex w-full max-w-xl flex-1 flex-col px-4 py-8 sm:py-12">
      <header className="mb-6">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-soft text-lg text-accent">
            ?
          </span>
          <h1 className="text-xl font-bold text-foreground">PortGuard</h1>
        </div>
        <p className="mt-2 text-sm text-muted">
          Know what&apos;s exposed on your network - free, instant, no signup.
        </p>
      </header>

      <ToolTabs active={activeTab} onChange={setActiveTab} />

      <div className="mt-4">
        {activeTab === "device" && <DeviceLookupPanel />}
        {activeTab === "ports" && <PortReferencePanel />}
      </div>

      <CrossPromoFooter />
    </main>
  );
}
