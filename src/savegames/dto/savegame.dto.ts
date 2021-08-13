import { ApiProperty } from '@nestjs/swagger';
import { FillTypeDto } from '../../fill-types/dto/fill-type.dto';
import { SellStationDto } from '../../sell-stations/dto/sell-station.dto';

export class SavegameDto {
  @ApiProperty({ format: 'uuid' })
  id: string;

  @ApiProperty()
  ownerId: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  inviteCode: string;

  @ApiProperty({ type: () => FillTypeDto, isArray: true })
  fillTypes: FillTypeDto[];

  @ApiProperty({ type: () => SellStationDto, isArray: true })
  sellStations: SellStationDto[];
}
