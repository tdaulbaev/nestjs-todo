import { ApiProperty } from '@nestjs/swagger';
import { MinLength, IsString, IsNotEmpty } from 'class-validator';

export class CreateTodoDto {
  @ApiProperty({ example: 'some Todo text content' })
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  content: string;
}
