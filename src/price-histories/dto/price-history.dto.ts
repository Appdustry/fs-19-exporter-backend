import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { FillTypeDto } from '../../fill-types/dto/fill-type.dto';
import { SellStationDto } from '../../sell-stations/dto/sell-station.dto';

export class PriceHistoryDto {
  @ApiProperty({ format: 'uuid' })
  id: string;

  @ApiProperty({ format: 'uuid' })
  fillTypeId: string;

  @ApiProperty({ type: 'number', minimum: 0 })
  price: number;

  @ApiProperty({ format: 'uuid' })
  sellStationId: string;

  @ApiProperty({ type: 'integer', minimum: 0 })
  day: number;

  @ApiProperty({ type: 'integer', minimum: 0 })
  time: number;

  @ApiProperty({ type: 'string', format: 'datetime' })
  createdAt: Date;

  @ApiPropertyOptional({ type: () => FillTypeDto })
  fillType: FillTypeDto;

  @ApiPropertyOptional({ type: () => SellStationDto })
  sellStation: SellStationDto;
}
