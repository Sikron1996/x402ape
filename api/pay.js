export default async function handler(req, res) {
  if (req.query && req.query.paid === "true") {
    return res.status(200).json({ status: "success", message: "✅ Payment successful" });
  }

  const FACILITATOR_URL = "https://x402-facilitator.aurracloud.com/api/v1/3b3cc8eb-5c36-419b-aeda-052a227debac";
  const RECEIVER = "0xF97a410f2f0b64Cb5820baD63d878c3A967235AA";
  const USDC_BASE = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913";

  const x402Response = {
    x402Version: 1,
    payer: FACILITATOR_URL,
    accepts: [
      {
        scheme: "exact",
        network: "base",
        maxAmountRequired: "1",
        resource: "https://x402ape-cjnv.vercel.app/api/pay",
        description: "x402ape service payment (1 USDC, Base)",
        mimeType: "application/json",
        payTo: RECEIVER,
        maxTimeoutSeconds: 600,
        asset: USDC_BASE,
        outputSchema: {
          input: { type: "http", method: "GET" },
          output: { status: "success" }
        },
        extra: {
          serviceName: "x402ape",
          version: "v9.2",
          note: "AurraCloud facilitator handles payments"
        }
      }
    ]
  };

  res.status(402).json(x402Response);
}
