export default async function handler(req, res) {
  // if PayAI / wallet calls back with paid=true
  if (req.query && req.query.paid === "true") {
    return res.status(200).json({
      status: "success",
      message: "✅ Payment successful"
    });
  }

  const FACILITATOR_URL = "https://facilitator.b402.ai";

  const x402Response = {
    x402Version: 1,
    payer: FACILITATOR_URL,
    accepts: [
      {
        scheme: "exact",
        network: "bsc",
        maxAmountRequired: "0.1",
        resource: "https://x402ape-o499.vercel.app/api/pay",
        description: "x402ape service payment (1 USD1, BNB)",
        mimeType: "application/json",
        payTo: "0xF97a410f2f0b64Cb5820baD63d878c3A967235AA",
        maxTimeoutSeconds: 600,
        asset: "0x8d0D000Ee44948FC98c9B98A4FA4921476f08B0d",
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
          version: "v6",
          payment: "metamask+base+usdc"
        }
      }
    ]
  };

  res.status(402).json(x402Response);
}
