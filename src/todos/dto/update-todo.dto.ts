import { PartialType } from '@nestjs/swagger';
import { CreateTodoDto } from './create-todo.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, Validate } from 'class-validator';
import { IsExist } from '../../utils/validators/is-exists.validator';

export class UpdateTodoDto extends PartialType(CreateTodoDto) {
  @ApiProperty({ example: 1 })
  @Validate(IsExist, ['Todo', 'id'], {
    message: 'todoNotExists',
  })
  id: number;

  @ApiProperty({ example: 'some Todo text content' })
  @IsString()
  @MinLength(5)
  content?: string;
}
