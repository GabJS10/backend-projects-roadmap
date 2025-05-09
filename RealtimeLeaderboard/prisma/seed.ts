import { PrismaClient } from '../src/generated/prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Crear usuarios
  const password = await bcrypt.hash('password123', 10);

  const users = await prisma.user.createMany({
    data: [
      { name: 'Ana', email: 'ana@example.com', password },
      { name: 'Luis', email: 'luis@example.com', password },
      { name: 'Carlos', email: 'carlos@example.com', password },
    ],
  });

  console.log('✅ Usuarios creados');

  // Crear juegos
  const games = await prisma.game.createMany({
    data: [
      { name: 'Space Invaders', description: 'Juego clásico de disparos.' },
      { name: 'Rocket League', description: 'Fútbol con coches.' },
      { name: 'Mario Kart', description: 'Carreras alocadas.' },
    ],
  });

  console.log('✅ Juegos creados');

  const allUsers = await prisma.user.findMany();
  const allGames = await prisma.game.findMany();

  for (const user of allUsers) {
    for (const game of allGames) {
      await prisma.score.create({
        data: {
          user_id: user.id,
          game_id: game.id,
          score: Math.floor(Math.random() * 1000),
        },
      });
    }
  }

  console.log('✅ Scores creados');
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
