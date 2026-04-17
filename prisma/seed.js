// prisma/seed.js
const prisma = require('../src/lib/db'); // <-- Notice the ../ here

async function main() {
  // 1. Create a test user
  const user = await prisma.user.create({
    data: {
      name: 'Test User',
      email: 'test@example.com',
    },
  });

  // 2. Create a test product with stock
  const product = await prisma.product.create({
    data: {
      name: 'Laptop',
      price: 999.99,
      stock: 10,
    },
  });

  console.log('✅ Success! Data added.');
  console.log(`👉 Use this userId: ${user.id}`);
  console.log(`👉 Use this productId: ${product.id}`);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });