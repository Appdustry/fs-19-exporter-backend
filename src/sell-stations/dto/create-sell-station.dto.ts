import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class CreateSellStationDto {
  @ApiProperty({ format: 'uuid' })
  @IsUUID()
  savegameId: string;

  @ApiProperty()
  @IsString()
  name: string;
}
