import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const categories_by_default = [
    'Groceries',
    'Leisure',
    'Electronics',
    'Utilities',
    'Clothing',
    'Health',
    'Others',
  ];

  for (const category of categories_by_default) {
    await prisma.category.create({
      data: {
        name: category,
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
