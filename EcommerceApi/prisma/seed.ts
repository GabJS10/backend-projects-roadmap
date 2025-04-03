import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const USERS_ROLE = ['user', 'admin'];

  await prisma.role.createMany({
    data: USERS_ROLE.map((role) => ({ name: role })),
    skipDuplicates: true,
  });

  const adminRole = await prisma.role.findFirst({ where: { name: 'admin' } });

  const user = await prisma.user.upsert({
    where: { email: 'admin@gmail.com' },
    update: {},
    create: {
      email: 'admin@gmail.com',
      name: 'admin',
      password: await bcrypt.hash('admin', 10),
    },
  });

  await prisma.userRole.upsert({
    where: { role_id_user_id: { role_id: adminRole.id, user_id: user.id } },
    update: {},
    create: {
      user_id: user.id,
      role_id: adminRole.id,
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
