export default async function handler(req, res) {
  // Allow manual success check (e.g. facilitator callback or manual poll)
  if (req.query && req.query.paid === "true") {
    return res.status(200).json({ status: "success" });
  }

  const FACILITATOR_URL = "https://x402-facilitator.aurracloud.com/api/v1/3b3cc8eb-5c36-419b-aeda-052a227debac";

  const x402Response = {
    x402Version: 1,
    payer: FACILITATOR_URL,
    accepts: [
      {
        scheme: "exact",
        network: "base",
        maxAmountRequired: "1",
        resource: "x402ape",
        description: "x402ape service payment (1 USDC, Base)",
        mimeType: "application/json",
        payTo: "0xF97a410f2f0b64Cb5820baD63d878c3A967235AA",
        maxTimeoutSeconds: 600,
        asset: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
        outputSchema: {
          input: {
            type: "http",
            method: "GET"
          },
          output: {
            status: "success"
          }
        },
        extra: {
          serviceName: "x402ape",
          note: "Payment confirmed by facilitator"
        }
      }
    ]
  };

  // x402 requires 402
  res.status(402).json(x402Response);
}
