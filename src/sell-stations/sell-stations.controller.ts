import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiFoundResponse, ApiTags } from '@nestjs/swagger';
import { CreateSellStationDto } from './dto/create-sell-station.dto';
import { SellStationDto } from './dto/sell-station.dto';
import { SellStationsService } from './sell-stations.service';

@Controller('sell-stations')
@ApiTags('SellStations')
export class SellStationsController {
  constructor(private sellStationsService: SellStationsService) {}

  @Post()
  @ApiBody({ type: CreateSellStationDto })
  @ApiFoundResponse({ type: SellStationDto })
  createSellStation(@Body() body: CreateSellStationDto) {
    return this.sellStationsService.createOne(body);
  }
}
