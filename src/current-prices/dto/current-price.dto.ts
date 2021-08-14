import { ApiProperty } from '@nestjs/swagger';

export class CurrentPriceDto {
  @ApiProperty({ format: 'uuid' })
  id: string;

  @ApiProperty()
  currentPrice: number;

  @ApiProperty({ format: 'uuid' })
  fillTypeId: string;

  @ApiProperty({ format: 'uuid' })
  sellStationId: string;
}
