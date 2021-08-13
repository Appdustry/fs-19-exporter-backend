import { PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsInt, IsOptional, Min } from 'class-validator';
import { CreatePriceHistoryDto } from '../../price-histories/dto/create-price-history.dto';
import { CreateFillTypeDto } from './create-fill-type.dto';

export class UpdateFillTypeDto extends PartialType(CreateFillTypeDto) {
  @ApiPropertyOptional({ type: 'integer', minimum: 0, default: 0 })
  @IsOptional()
  @IsInt()
  @Min(0)
  currentLevel?: number;

  @ApiPropertyOptional({ type: CreatePriceHistoryDto, isArray: true })
  @IsOptional()
  @IsArray({ each: true })
  priceHistory?: CreatePriceHistoryDto[];
}
