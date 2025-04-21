import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {

  const user = await prisma.user.upsert({
    where: { email: 'jgabis65@gmail.com' },
    update: {},
    create: {
      email: 'jgabis65@gmail.com',
      name: '12345678',
      password: await bcrypt.hash('admin', 10),
    },
  });


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
