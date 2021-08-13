import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PriceHistoryDto } from '../../price-histories/dto/price-history.dto';

export class FillTypeDto {
  @ApiProperty({ format: 'uuid' })
  id: string;

  @ApiProperty({ format: 'uuid' })
  savegameId: string;

  @ApiProperty({ type: 'integer', minimum: 0 })
  fillTypeIndex: number;

  @ApiProperty({ type: 'number', minimum: 0 })
  basePrice: number;

  @ApiProperty({ type: 'number', minimum: 0 })
  mass: number;

  @ApiProperty()
  displayName: string;

  @ApiPropertyOptional({ type: 'number', minimum: 0 })
  priceHigh?: number;

  @ApiPropertyOptional({ type: 'number', minimum: 0 })
  priceLow?: number;

  @ApiProperty({ type: 'integer', default: 0, minimum: 0 })
  currentLevel: number;

  @ApiPropertyOptional({ isArray: true, type: () => PriceHistoryDto })
  priceHistory?: PriceHistoryDto[];
}
