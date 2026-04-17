# Prisma in a Live Express API

## 🚀 Setup & Testing

To run this solution locally and verify it works before grading students:

```bash
# 1. Install dependencies
npm install

# 2. Add your database URL to your .env (Neon or Local Postgres)
DATABASE_URL="postgresql://user:password@host:port/db"

# 3. Apply the schema changes (creates the migrations folder)
npx prisma migrate dev --name add-stock

# 4. Seed the database with a test User and Product
node prisma/seed.js

# 5. Start the server
npm run dev
```

## 🔑 The Answer Key (Where to look)

This repo contains the correct implementation for all intentional bugs the students were asked to fix.

| Task | Location | The Fix |
| :--- | :--- | :--- |
| **01 (SQL → Prisma)** | `product.controller.js` | Replaced `pool.query` with `await prisma.product.findMany()` |
| **02 (Schema)** | `schema.prisma` | Added `stock Int @default(0)` to the `Product` model. |
| **03 (Fix Leaks)** | `product & order controllers` | Deleted the inline `new PrismaClient()` calls. |
| **04 (Singleton)** | `src/lib/db.js` | Created this file to instantiate and export a single `PrismaClient`. |
| **05 (Null Safety)** | `product.controller.js` | Added `if (!product)` to return a 404 in `getProductById`. |
| **06 (Transaction)** | `order.controller.js` | Wrapped the Order creation and Stock decrement inside `prisma.$transaction([])`. |

---

## 📋 Mentor Grading Checklist (3-Minute Review)

When reviewing a student's GitHub PR and Video, look for these specific elements:

### 1. The GitHub PR Review
- [ ] **`prisma/migrations/` exists:** Proves they ran the migration command (Task 02).
- [ ] **`src/lib/db.js` created:** Proves they built the singleton (Task 04).
- [ ] **No `new PrismaClient()` in controllers:** They must import from `../lib/db` instead (Task 03).
- [ ] **Clean 404 handler:** Look for an `if (!product)` guard inside `getProductById` (Task 05).
- [ ] **The Transaction Array:** Look for `prisma.$transaction([ ... ])` in `purchaseItem` (Task 06).

### 2. The Video Review (3–5 mins)
- [ ] **Demonstrates 404:** They show Postman hitting an invalid ID and getting a clean JSON error without crashing the server.
- [ ] **Explains the Transaction:** They verbally explain why they used `$transaction` (e.g., *"If the server crashes after the order is made, the stock still rolls back so data isn't corrupted"*).

---