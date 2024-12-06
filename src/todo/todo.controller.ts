import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { TodoService } from './todo.service';
import { CreateTodoDto, EditTodoDto } from './dto';

@UseGuards(JwtGuard)
@Controller('todos')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get()
  getTodos(@GetUser('id') userId: number) {
    return this.todoService.getTodos(userId);
  }

  @Get(':id')
  getTodoById(@GetUser('id') userId: number, @Param('id', ParseIntPipe) todoId: number) {
    return this.todoService.getTodoById(userId, todoId);
  }

  @Post()
  createTodo(@GetUser('id') userId: number, @Body() dto: CreateTodoDto) {
    return this.todoService.createTodo(userId, dto);
  }

  @Patch(':id')
  editTodoById(@GetUser('id') userId: number, @Param('id', ParseIntPipe) todoId: number, @Body() dto: EditTodoDto) {
    return this.todoService.editTodoById(userId, todoId, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteTodoById(@GetUser('id') userId: number, @Param('id', ParseIntPipe) todoId: number) {
    return this.todoService.deleteTodoById(userId, todoId);
  }
}
