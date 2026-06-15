export type PortInfo = {
  port: number;
  name: string;
  description: string;
  risk: "low" | "medium" | "high";
  tip: string;
};

export const PORT_REFERENCE: PortInfo[] = [
  {
    port: 21,
    name: "FTP",
    description: "File Transfer Protocol - sends files and credentials unencrypted.",
    risk: "high",
    tip: "Replace with SFTP/FTPS, or disable if unused.",
  },
  {
    port: 22,
    name: "SSH",
    description: "Secure remote login and file transfer.",
    risk: "medium",
    tip: "Use key-based auth, disable password login, and restrict by IP if possible.",
  },
  {
    port: 23,
    name: "Telnet",
    description: "Unencrypted remote login - credentials sent in plain text.",
    risk: "high",
    tip: "Disable entirely and use SSH instead.",
  },
  {
    port: 25,
    name: "SMTP",
    description: "Email sending between mail servers.",
    risk: "medium",
    tip: "Ensure it's not an open relay; require authentication.",
  },
  {
    port: 53,
    name: "DNS",
    description: "Domain name resolution.",
    risk: "medium",
    tip: "Restrict recursive queries to trusted networks to avoid abuse.",
  },
  {
    port: 80,
    name: "HTTP",
    description: "Unencrypted web traffic.",
    risk: "medium",
    tip: "Redirect to HTTPS (port 443) and enable HSTS.",
  },
  {
    port: 110,
    name: "POP3",
    description: "Email retrieval, often unencrypted.",
    risk: "medium",
    tip: "Use POP3S (port 995) instead.",
  },
  {
    port: 143,
    name: "IMAP",
    description: "Email retrieval, often unencrypted.",
    risk: "medium",
    tip: "Use IMAPS (port 993) instead.",
  },
  {
    port: 443,
    name: "HTTPS",
    description: "Encrypted web traffic.",
    risk: "low",
    tip: "Keep certificates current and disable outdated TLS versions.",
  },
  {
    port: 445,
    name: "SMB",
    description: "Windows file sharing - a common ransomware entry point.",
    risk: "high",
    tip: "Never expose this to the internet; restrict to your local network only.",
  },
  {
    port: 1433,
    name: "Microsoft SQL Server",
    description: "Database access for SQL Server.",
    risk: "high",
    tip: "Never expose directly to the internet; use a VPN or private network.",
  },
  {
    port: 3306,
    name: "MySQL",
    description: "Database access for MySQL/MariaDB.",
    risk: "high",
    tip: "Bind to localhost or a private network, never the public internet.",
  },
  {
    port: 3389,
    name: "RDP",
    description: "Windows Remote Desktop - a top ransomware entry point.",
    risk: "high",
    tip: "Put behind a VPN, enable network-level authentication, and use strong passwords with lockout policies.",
  },
  {
    port: 5432,
    name: "PostgreSQL",
    description: "Database access for PostgreSQL.",
    risk: "high",
    tip: "Bind to localhost or a private network, never the public internet.",
  },
  {
    port: 5900,
    name: "VNC",
    description: "Remote desktop access, often with weak default authentication.",
    risk: "high",
    tip: "Use strong passwords and tunnel over SSH/VPN rather than exposing directly.",
  },
  {
    port: 6379,
    name: "Redis",
    description: "In-memory database, frequently left open with no authentication.",
    risk: "high",
    tip: "Enable authentication and bind to a private network only.",
  },
  {
    port: 8080,
    name: "HTTP (alternate)",
    description: "Commonly used for web apps, admin panels, or proxies.",
    risk: "medium",
    tip: "Make sure anything here requires authentication and uses HTTPS.",
  },
  {
    port: 8443,
    name: "HTTPS (alternate)",
    description: "Commonly used for admin panels and management interfaces.",
    risk: "medium",
    tip: "Restrict access to trusted IPs and keep software patched.",
  },
  {
    port: 27017,
    name: "MongoDB",
    description: "Database access for MongoDB.",
    risk: "high",
    tip: "Enable authentication and bind to a private network only.",
  },
];

export function lookupPort(port: number): PortInfo | null {
  return PORT_REFERENCE.find((p) => p.port === port) ?? null;
}
