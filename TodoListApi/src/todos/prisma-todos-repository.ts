import { Todo } from '@prisma/client';
import { TodosRepository } from './todos-repository';
import { PrismaService } from 'src/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaTodosRepository implements TodosRepository {
  constructor(private prisma: PrismaService) {}

  async createTodo(todo: Todo): Promise<Todo | null> {
    try {
      return await this.prisma.todo.create({ data: todo });
    } catch (error) {
      return null;
    }
  }

  async deleteTodo(id: number, user_id: number): Promise<Todo | null> {
    const getTodo = await this.findTodoById(id, user_id);

    if (!getTodo || getTodo.userId !== user_id) return null;

    return await this.prisma.todo.delete({ where: { id } });
  }

  async updateTodo(
    id: number,
    user_id: number,
    todo: Todo,
  ): Promise<Todo | null> {
    const getTodo = await this.findTodoById(id, user_id);

    if (!getTodo || getTodo.userId !== user_id) return null;

    return await this.prisma.todo.update({
      where: { id },
      data: todo,
    });
  }

  async findTodoById(id: number, user_id: number): Promise<Todo | null> {
    try {
      return await this.prisma.todo.findUnique({
        where: {
          id,
          userId: user_id,
        },
      });
    } catch (error) {
      return null;
    }
  }

  async getAllTodos(page: number, limit: number): Promise<Todo[] | null | any> {
    const todos = await this.prisma.todo.findMany({
      skip: (page - 1) * limit,
      take: limit,
    });
    const total = await this.prisma.todo.count();
    return {
      data: todos,
      page,
      limit,
      total,
      totalPage: Math.ceil(total / limit),
    };
  }

  async getTodosByQuery(
    query: string,
    page: number,
    limit: number,
  ): Promise<Todo[] | null | any> {
    try {
      const todos = await this.prisma.todo.findMany({
        where: {
          OR: [
            { title: { contains: query } },
            { description: { contains: query } },
          ],
        },
      });

      if (!todos) return null;

      const total = await this.prisma.todo.count();
      return {
        data: todos,
        page,
        limit,
        total,
        totalPage: Math.ceil(total / limit),
      };
    } catch (error) {
      return null;
    }
  }
}
