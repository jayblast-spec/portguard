<div align="center">

# PortGuard

### Know What's Open Before Attackers Do

PortGuard is a free port reference and exposed-device lookup tool — see risky open ports on a network before they turn into doors for attackers.

<p>
  <a href="https://github.com/jayblast-spec/portguard"><img alt="GitHub Repo" src="https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github&logoColor=white"></a>
</p>

<p>
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-App%20Router-000000?style=flat-square&logo=next.js&logoColor=white">
  <img alt="React" src="https://img.shields.io/badge/React-19-1D4ED8?style=flat-square&logo=react&logoColor=white">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-Strict-3178C6?style=flat-square&logo=typescript&logoColor=white">
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind%20CSS-4-38BDF8?style=flat-square&logo=tailwindcss&logoColor=white">
  <img alt="Vercel" src="https://img.shields.io/badge/Vercel-Deployment-000000?style=flat-square&logo=vercel&logoColor=white">
</p>

<p>
  <img alt="Animated PortGuard headline" src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&weight=700&size=18&duration=2600&pause=650&color=1D4ED8&center=true&vCenter=true&width=760&lines=Search+a+port+or+a+device+IP;Every+well-known+port%2C+risk-rated;See+what+a+host+exposes%2C+not+guess;No+login%2C+results+in+milliseconds">
</p>

</div>

## What It Does

PortGuard combines a port reference (service name, purpose, and relative risk for well-known ports) with an exposed-device lookup: enter an IP or search a port/service and PortGuard reports what's plausibly exposed on that host, so the risk of an open port is visible before it's exploited.

## How It Works

- Next.js App Router front end (`app/page.tsx`) drives the port reference and lookup interface.
- `app/api/device-lookup/route.ts` validates the IPv4/IPv6 address, then queries the real Shodan host API server-side when `SHODAN_API_KEY` is configured.
- Styling is Tailwind CSS 4; the reference data and lookup flow require no login.

## Engineering Notes

**The real problem:** "what's on this port" reference tables exist everywhere, but they don't tell you what's actually exposed on *your* address right now — that requires a real internet-wide scan index, not a static table.

**The approach:** `device-lookup` queries Shodan's real host API — the same index security researchers use — for the target IP, and degrades honestly: no key configured returns `{ unavailable: true }` rather than a fabricated result, and a 404 from Shodan means "found: false," not an error.

**One real number:** the static port reference table covers real, risk-tagged entries (each with a `low`/`medium`/`high` risk label and remediation tip) — not just a port-to-service name mapping.

**Not handled yet:** domain lookups aren't supported yet, only raw IPv4/IPv6 — and the homepage "intelligence layer" is a decorative heuristic disconnected from the real Shodan lookup.

## Live

Production: *(demo temporarily offline)*

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js (App Router) |
| UI Library | React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS 4 |
| Server Logic | Next.js API routes (`/api/device-lookup`, `/api/intelligence`) |
| Deployment | Vercel |

<p align="center">
  <img alt="ArkNet Digital" src="https://capsule-render.vercel.app/api?type=rect&height=70&color=0:1D4ED8,55:0B1E3D,100:020617&text=ArkNet%20Digital%20%7C%20Contact%3A%20michael%40arknet.digital&fontColor=FAFAFA&fontSize=16&fontAlign=50&animation=fadeIn">
</p>
