import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PriceHistoryDto } from '../../price-histories/dto/price-history.dto';
import { SavegameDto } from '../../savegames/dto/savegame.dto';

export class SellStationDto {
  @ApiProperty({ format: 'uuid' })
  id: string;

  @ApiProperty({ format: 'uuid' })
  savegameId: string;

  @ApiProperty()
  name: string;

  @ApiPropertyOptional({ type: () => SavegameDto })
  savegame?: SavegameDto;

  @ApiPropertyOptional({ isArray: true, type: () => PriceHistoryDto })
  priceHistories?: PriceHistoryDto[];
}
