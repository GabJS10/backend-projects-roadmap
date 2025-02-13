import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { PrismaService } from 'src/prisma.service';
import { TODOS_REPOSITORY } from './todos-repository';
import { PrismaTodosRepository } from './prisma-todos-repository';
@Module({
  controllers: [TodosController],
  providers: [
    TodosService,
    PrismaService,
    {
      provide: TODOS_REPOSITORY,
      useClass: PrismaTodosRepository,
    },
  ],
})
export class TodosModule {}
