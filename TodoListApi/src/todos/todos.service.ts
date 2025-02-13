import { Inject, Injectable } from '@nestjs/common';
import { TODOS_REPOSITORY, TodosRepository } from './todos-repository';
import { CreateTodoDto } from './dto/create-todo-dto';
import { UpdateTodoDto } from './dto/update-todo-dto';

@Injectable()
export class TodosService {
  constructor(
    @Inject(TODOS_REPOSITORY) private readonly todosRepository: TodosRepository,
  ) {}

  async createTodo({ title, description, userId }: CreateTodoDto) {
    return await this.todosRepository.createTodo({
      title,
      description,
      userId,
    });
  }

  async deleteTodo(id: number, user_id: number) {
    return await this.todosRepository.deleteTodo(id, user_id);
  }

  async updateTodo(id: number, user_id: number, todo: UpdateTodoDto) {
    return await this.todosRepository.updateTodo(id, user_id, todo);
  }

  async findTodoById(id: number, user_id: number) {
    return await this.todosRepository.findTodoById(id, user_id);
  }

  async getAllTodos(page: number, limit: number) {
    return await this.todosRepository.getAllTodos(page, limit);
  }

  async getTodosByQuery(query: string, page: number, limit: number) {
    return await this.todosRepository.getTodosByQuery(query, page, limit);
  }
}
