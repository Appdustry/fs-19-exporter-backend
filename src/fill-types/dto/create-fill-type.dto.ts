import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';
import { CreatePriceHistoryDto } from '../../price-histories/dto/create-price-history.dto';

export class CreateFillTypeDto {
  @ApiProperty({ format: 'uuid' })
  @IsUUID()
  savegameId: string;

  @ApiProperty()
  name: string;

  @ApiProperty({ type: 'integer', minimum: 0 })
  @IsInt()
  @Min(0)
  fillTypeIndex: number;

  @ApiProperty({ type: 'number', minimum: 0 })
  @IsNumber()
  @Min(0)
  basePrice: number;

  @ApiProperty({ type: 'number', minimum: 0 })
  @IsNumber()
  @Min(0)
  mass: number;

  @ApiProperty()
  @IsString()
  displayName: string;

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
