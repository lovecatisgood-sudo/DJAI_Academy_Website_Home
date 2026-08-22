function deriveInternalPorts(processId) {
  const normalizedProcessId = Math.abs(Number(processId) || 0);
  const basePort = 10_000 + ((normalizedProcessId % 25_000) * 2);
  return { homepagePort: basePort, voicePromoPort: basePort + 1 };
}

function resolveInternalPorts({ processId, rootPort, homepageOverride, voicePromoOverride }) {
  const derived = deriveInternalPorts(processId);
  const homepagePort = Number(homepageOverride || derived.homepagePort);
  const voicePromoPort = Number(voicePromoOverride || derived.voicePromoPort);

  for (const [name, port] of [["homepage", homepagePort], ["voice promo", voicePromoPort]]) {
    if (!Number.isInteger(port) || port < 1 || port > 65_535) {
      throw new Error(`Invalid ${name} internal port: ${port}`);
    }
  }
  if (homepagePort === voicePromoPort) {
    throw new Error("Homepage and voice promo must use different internal ports");
  }
  if (homepagePort === Number(rootPort) || voicePromoPort === Number(rootPort)) {
    throw new Error("An internal service port conflicts with the public application port");
  }

  return { homepagePort, voicePromoPort };
}

module.exports = { deriveInternalPorts, resolveInternalPorts };
