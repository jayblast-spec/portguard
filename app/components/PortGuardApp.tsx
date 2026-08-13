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
        <div className="flex items-center gap-3">
          <span className="icon-3d">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
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
