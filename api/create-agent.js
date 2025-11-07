export default async function handler(req, res) {
  const { key } = req.query;
  if (key !== "12345") {
    return res.status(403).json({ error: "Forbidden" });
  }

  try {
    const body = {
      wallet: "0xF97a410f2f0b64Cb5820baD63d878c3A967235AA",
      networks: ["base"],
      assets: ["0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913"],
      callback: "https://x402ape-cjnv.vercel.app/api/pay?paid=true"
    };

    const response = await fetch("https://facilitator.payai.network/api/v1/agents", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message || "Agent creation failed" });
  }
}
