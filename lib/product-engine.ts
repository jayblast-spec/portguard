export type IntelligenceInput = { input?: string };
const product = {
  "repo": "PortGuard",
  "title": "PortGuard",
  "eyebrow": "ArkNet Digital / Cybersecurity Suite",
  "theme": "from-emerald-300 via-cyan-300 to-blue-400",
  "hero": "Turn open ports into a prioritized firewall action plan.",
  "sub": "PortGuard is a defensive network exposure cockpit for analysts, MSPs, and operators who need to understand exposed services, business risk, and remediation steps fast.",
  "input": "api.company.com:443, 10.0.4.0/24, or exposed RDP on finance workstation",
  "cta": "Analyze port exposure",
  "scoreLabel": "Exposure score",
  "panels": [
    [
      "Service fingerprint",
      "Map ports to expected service behavior and risky defaults."
    ],
    [
      "Firewall intent",
      "Translate exposure into allow, deny, segment, or monitor decisions."
    ],
    [
      "Remediation owner",
      "Assign the next action to network, platform, or security teams."
    ],
    [
      "Change proof",
      "Keep a record of what was reviewed and why it changed."
    ]
  ],
  "rows": [
    [
      "22 / SSH",
      "Admin access",
      "High",
      "Restrict source ranges and require key rotation evidence."
    ],
    [
      "3389 / RDP",
      "Remote desktop",
      "Critical",
      "Block public access and move behind VPN or ZTNA."
    ],
    [
      "443 / HTTPS",
      "Public app",
      "Medium",
      "Check headers, TLS, auth boundary, and API routes."
    ],
    [
      "5432 / Postgres",
      "Database",
      "Critical",
      "Never public. Verify security group and private subnet."
    ]
  ],
  "missions": [
    [
      "Nmap import",
      "Parse XML/JSON scan results into the cockpit."
    ],
    [
      "Cloud firewall review",
      "Import AWS/Azure/GCP rules and explain risky exposure."
    ],
    [
      "Port knowledge base",
      "Improve service fingerprints and remediation notes."
    ],
    [
      "SLA queue",
      "Turn each risk into owner, severity, and due date."
    ]
  ],
  "apiExtra": "PortGuard should never encourage unauthorized scanning. Keep checks scoped to owned assets and imported scan results."
} as const;
function scoreFor(subject: string) { let score = 58 + Math.min(28, Math.floor(subject.length / 5)); if (/admin|rdp|database|credential|prod|public|critical|cve|phishing/i.test(subject)) score += 9; return Math.min(98, score); }
function severity(score: number) { return score >= 88 ? 'critical' : score >= 74 ? 'high' : score >= 61 ? 'medium' : 'low'; }
export function generateIntelligence({ input = '' }: IntelligenceInput) {
  const subject = input.trim() || product.input;
  const score = scoreFor(subject);
  return {
    product: product.title,
    brand: 'ArkNet Digital',
    category: product.hero,
    subject,
    score,
    severity: severity(score),
    executive_summary: product.sub,
    exposure_map: product.panels.map(([label, value]) => ({ label, value, status: score >= 74 ? 'priority' : 'review' })),
    remediation_queue: product.rows.slice(0, 3).map(([asset, type, risk, note]) => ({ action: asset + ' - ' + type, owner: risk === 'Critical' ? 'Security lead' : 'Blue Team', impact: note })),
    contributor_lanes: product.missions.map(([lane, mission]) => ({ lane, mission })),
    defensive_scope: product.apiExtra,
    generated_at: new Date().toISOString()
  };
}
