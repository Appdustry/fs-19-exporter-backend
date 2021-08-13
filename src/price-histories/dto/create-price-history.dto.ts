import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, IsString, IsUUID, Min } from 'class-validator';

export class CreatePriceHistoryDto {
  @ApiProperty({ type: 'number', minimum: 0 })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({ format: 'uuid' })
  @IsString()
  @IsUUID()
  sellStationId: string;

  @ApiProperty({ type: 'integer', minimum: 0 })
  @IsInt()
  @Min(0)
  day: number;

  @ApiProperty({ type: 'integer', minimum: 0 })
  @IsInt()
  @Min(0)
  time: number;
}
