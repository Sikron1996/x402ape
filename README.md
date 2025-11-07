# x402ape (Base, 1 USDC) — v2

Готовий endpoint під strict-схему x402scan + кнопка оплати на фронті.

## Що робить
- `/api/pay` (GET) — повертає 402 з повною схемою:
  - x402Version = 1
  - payer = твій фасилітатор: https://x402-facilitator.aurracloud.com/api/v1/3b3cc8eb-5c36-419b-aeda-052a227debac
  - accepts[0].network = base
  - accepts[0].asset = USDC (Base): 0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913
  - accepts[0].maxAmountRequired = "1"
  - accepts[0].outputSchema = { input: { type: "http", method: "GET" }, output: { status: "success" } }

- `/api/pay?paid=true` — повертає 200 OK і `{ "status": "success" }`
  Це можна використати як кінцеву точку, яку викликає фасилітатор після підтвердження платежу.

## Деплой
1. Залий це на Vercel.
2. Після деплою отримаєш: https://YOUR-PROJECT.vercel.app/api/pay
3. Це посилання додай у https://x402scan.com — воно має пройти валідацію.

## Фронт
На головній (`index.html`) є кнопка "Оплатити 1 USDC". Вона:
1. викликає `/api/pay`
2. якщо статус 402 — показує, що треба оплатити через фасилітатор
3. якщо статус 200 — показує "✅ Payment successful"
