import { Todo } from '@prisma/client';
export const TODOS_REPOSITORY = 'TodosRepository';

export interface TodosRepository {
  createTodo({
    title,
    description,
    userId,
  }: Pick<Todo, 'title' | 'description' | 'userId'>): Promise<Todo | null>;
  deleteTodo(id: number, user_id: number): Promise<Todo | null>;
  updateTodo(
    id: number,
    user_id: number,
    todo: Partial<Todo>,
  ): Promise<Todo | null>;
  findTodoById(id: number, user_id: number): Promise<Todo | null>;
  getAllTodos(page: number, limit: number): Promise<Todo[] | null | any>;
  getTodosByQuery(
    query: string,
    page: number,
    limit: number,
  ): Promise<Todo[] | null | any>;
}
