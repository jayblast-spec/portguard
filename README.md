# PortGuard

PortGuard is an ArkNet Digital cybersecurity product.

## Promise

Turn open ports into a prioritized firewall action plan.

PortGuard is a defensive network exposure cockpit for analysts, MSPs, and operators who need to understand exposed services, business risk, and remediation steps fast.

## Current v1

- Premium defensive cockpit UI
- Live product-specific intake
- `POST /api/intelligence`
- Product-specific scoring and remediation queue
- Contributor mission lanes
- Mobile-friendly layout

## Contributor Missions

- Nmap import: Parse XML/JSON scan results into the cockpit.
- Cloud firewall review: Import AWS/Azure/GCP rules and explain risky exposure.
- Port knowledge base: Improve service fingerprints and remediation notes.
- SLA queue: Turn each risk into owner, severity, and due date.

## Defensive Scope

PortGuard should never encourage unauthorized scanning. Keep checks scoped to owned assets and imported scan results.

## Run Locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```
