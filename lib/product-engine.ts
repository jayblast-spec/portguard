export type IntelligenceInput = { input?: string };

const product = {
  "repo": "PortGuard",
  "suite": "Cybersecurity Suite",
  "category": "Network exposure",
  "audience": "security analysts, IT admins, and MSP operators",
  "promise": "see risky open ports before attackers turn them into doors",
  "inputLabel": "Target host, subnet, or asset group",
  "placeholder": "api.company.com, 10.10.12.0/24, or finance laptops",
  "primary": "Scan exposure",
  "gradient": "from-emerald-300 via-cyan-300 to-blue-400",
  "modules": [
    "Attack surface score",
    "Port-to-service fingerprint",
    "Misconfiguration checklist",
    "Remediation runbook",
    "Executive exposure brief"
  ],
  "outputs": [
    "Public service risk score",
    "Most dangerous port/service pair",
    "Suggested firewall rule",
    "Owner and SLA recommendation"
  ],
  "next": [
    "Nmap XML import",
    "cloud security group review",
    "change-diff risk score",
    "team remediation SLA board"
  ]
} as const;

function score(text: string) {
  const length = text.trim().length;
  const diversity = new Set(text.toLowerCase().replace(/[^a-z0-9 ]/g, '').split(/\s+/).filter(Boolean)).size;
  return Math.min(97, 48 + Math.floor(length / 7) + Math.min(28, diversity));
}

export function generateIntelligence({ input = '' }: IntelligenceInput) {
  const subject = input.trim() || product.placeholder;
  const confidence = score(subject);
  const urgency = confidence > 82 ? 'high' : confidence > 66 ? 'medium' : 'starter';
  return {
    product: product.repo,
    category: product.category,
    subject,
    confidence,
    urgency,
    executive_summary: product.promise,
    immediate_outputs: product.outputs.map((output, index) => ({
      title: output,
      detail: output + ' for: ' + subject,
      priority: index === 0 ? 'primary' : index === 1 ? 'supporting' : 'next'
    })),
    automation_plan: product.modules.map((module, index) => ({
      stage: index + 1,
      module,
      value: 'Automate ' + module.toLowerCase() + ' so ' + product.audience + ' can move faster with less manual work.'
    })),
    future_addons: product.next.map((addon, index) => ({
      name: addon,
      horizon: index < 2 ? 'v2' : 'v3',
      contributor_lane: index % 2 === 0 ? 'integration' : 'product intelligence'
    })),
    contributor_brief: 'Improve ' + product.repo + ' by making ' + product.category.toLowerCase() + ' easier for ' + product.audience + '.',
    generated_at: new Date().toISOString()
  };
}
