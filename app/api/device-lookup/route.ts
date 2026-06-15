const IPV4_RE = /^(\d{1,3}\.){3}\d{1,3}$/;
const IPV6_RE = /^[0-9a-fA-F:]+:[0-9a-fA-F:]+$/;

export async function POST(request: Request) {
  let target: string | undefined;
  try {
    const body = await request.json();
    target = typeof body?.target === "string" ? body.target.trim() : undefined;
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!target) {
    return Response.json({ error: "Enter an IP address." }, { status: 400 });
  }

  if (!IPV4_RE.test(target) && !IPV6_RE.test(target)) {
    return Response.json(
      { error: "Enter a valid IPv4 or IPv6 address (domain lookups coming soon)." },
      { status: 400 }
    );
  }

  const apiKey = process.env.SHODAN_API_KEY;
  if (!apiKey) {
    return Response.json({ unavailable: true });
  }

  try {
    const res = await fetch(
      `https://api.shodan.io/shodan/host/${encodeURIComponent(target)}?key=${apiKey}`
    );

    if (res.status === 404) {
      return Response.json({ unavailable: false, found: false });
    }

    if (!res.ok) {
      return Response.json(
        { error: "Lookup failed. Try again shortly." },
        { status: 502 }
      );
    }

    const data = await res.json();

    const services = Array.isArray(data?.data)
      ? data.data.map((d: Record<string, unknown>) => ({
          port: d.port,
          transport: d.transport,
          product: d.product ?? null,
          version: d.version ?? null,
        }))
      : [];

    return Response.json({
      unavailable: false,
      found: true,
      org: data?.org ?? null,
      isp: data?.isp ?? null,
      country: data?.country_name ?? null,
      city: data?.city ?? null,
      hostnames: data?.hostnames ?? [],
      ports: data?.ports ?? [],
      services,
    });
  } catch {
    return Response.json(
      { error: "Lookup failed. Try again shortly." },
      { status: 502 }
    );
  }
}
