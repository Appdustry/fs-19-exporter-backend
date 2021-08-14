import { ApiProperty } from '@nestjs/swagger';

export class SetCurrentPriceDto {
  @ApiProperty({ format: 'uuid' })
  sellStationId: string;

  @ApiProperty()
  currentPrice: number;
}
