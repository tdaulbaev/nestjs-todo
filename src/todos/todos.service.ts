import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) {}

  create(createToDoDto: CreateTodoDto) {
    return this.todoRepository.save(this.todoRepository.create(createToDoDto));
  }

  findManyWithPagination(paginationOptions: IPaginationOptions) {
    return this.todoRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });
  }

  findOne(fields: EntityCondition<Todo>) {
    return this.todoRepository.findOne({
      where: fields,
    });
  }

  update(id: number, updateTodoDto: UpdateTodoDto) {
    return this.todoRepository.save(
      this.todoRepository.create({
        id,
        ...updateTodoDto,
      }),
    );
  }

  async softDelete(id: number): Promise<void> {
    await this.todoRepository.softDelete(id);
  }
}
