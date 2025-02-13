import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo-dto';
import { UpdateTodoDto } from './dto/update-todo-dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Request } from 'express';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  @HttpCode(201)
  @UseGuards(JwtAuthGuard)
  async createTodo(@Body() { title, description, userId }: CreateTodoDto) {
    const todo = await this.todosService.createTodo({
      title,
      description,
      userId,
    });

    if (!todo) throw new HttpException('Todo not created', 400);

    return todo;
  }

  @Delete(':id')
  @HttpCode(204)
  @UseGuards(JwtAuthGuard)
  async deleteTodo(@Param('id') id: number, @Req() req: Request) {
    const todo = await this.todosService.deleteTodo(id, req.user['id']);

    if (!todo)
      throw new HttpException('You are not the owner or todo not found', 403);

    return todo;
  }

  @Get('search')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  async getTodosByQuery(
    @Query('query') query: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    if (!query) throw new HttpException('Query is required', 400);

    return await this.todosService.getTodosByQuery(
      query.toUpperCase(),
      page || 1,
      limit || 10,
    );
  }

  @Get()
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  async getAllTodos(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return await this.todosService.getAllTodos(page || 1, limit || 10);
  }

  @Get(':id')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  async findTodoById(@Param('id') id: number, @Req() req: Request) {
    if (!id) throw new HttpException('Id is required', 400);

    if (isNaN(id)) throw new HttpException('Id must be a number', 400);

    const todo = await this.todosService.findTodoById(
      parseInt(id.toString()),
      req.user['id'],
    );

    if (!todo) throw new HttpException('Todo not found', 404);

    return todo;
  }

  @Patch(':id')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  async updateTodo(
    @Param('id') id: number,
    @Body() todo: UpdateTodoDto,
    @Req() req: Request,
  ) {
    if (!id) throw new HttpException('Id is required', 400);

    if (isNaN(id)) throw new HttpException('Id must be a number', 400);

    const todoUpdated = await this.todosService.updateTodo(
      parseInt(id.toString()),
      req.user['id'],
      todo,
    );

    if (!todoUpdated)
      throw new HttpException('Todo not updated or you are not the owner', 403);

    return todoUpdated;
  }
}
