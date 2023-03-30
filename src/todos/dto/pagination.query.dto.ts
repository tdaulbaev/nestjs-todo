import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

type ToNumberOptions = {
  default?: number;
  min?: number;
  max?: number;
};

const toNumber = (value: string, opts: ToNumberOptions = {}): number => {
  let newValue: number = Number.parseInt(value || String(opts.default), 10);

  if (Number.isNaN(newValue)) {
    newValue = opts.default;
  }

  if (opts.min) {
    if (newValue < opts.min) {
      newValue = opts.min;
    }

    if (newValue > opts.max) {
      newValue = opts.max;
    }
  }

  return newValue;
};

export class PaginationQueryDto {
  @ApiProperty({ example: 1, type: Number, required: false })
  @IsOptional()
  @Transform(({ value }) => toNumber(value, { default: 1, min: 1 }))
  @IsNumber()
  page?: number = 1;

  @ApiProperty({ example: 30, type: Number, required: false })
  @IsOptional()
  @Transform(({ value }) => toNumber(value, { default: 30 }))
  @IsNumber()
  limit?: number = 30;
}
