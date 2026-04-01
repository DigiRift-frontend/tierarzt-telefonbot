export function getClientInfo() {
  if (typeof window === "undefined") return {};
  return {
    userAgent: navigator.userAgent,
    screenSize: `${window.screen.width}x${window.screen.height}`,
    referrer: document.referrer || undefined,
  };
}

export async function sendLead(data: Record<string, unknown>) {
  return fetch("/api/lead", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...data, ...getClientInfo() }),
  });
}
