import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { SavegamesService } from './savegames.service';
import { CreateSavegameDto } from './dto/create-savegame.dto';
import { UpdateSavegameDto } from './dto/update-savegame.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiFoundResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { FillTypesService } from '../fill-types/fill-types.service';
import { SellStationsService } from '../sell-stations/sell-stations.service';
import { SavegameDto } from './dto/savegame.dto';
import { FillTypeDto } from '../fill-types/dto/fill-type.dto';
import { SellStationDto } from '../sell-stations/dto/sell-station.dto';
import { CreateFillTypeDto } from '../fill-types/dto/create-fill-type.dto';
import { CreateSellStationDto } from '../sell-stations/dto/create-sell-station.dto';
import { CreatePriceHistoryDto } from '../price-histories/dto/create-price-history.dto';

@ApiTags('SaveGames')
@Controller('savegames')
export class SavegamesController {
  constructor(
    private readonly savegamesService: SavegamesService,
    private readonly fillTypeService: FillTypesService,
    private readonly sellStationsService: SellStationsService,
  ) {}

  @Post()
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: SavegameDto })
  create(@Body() createSavegameDto: CreateSavegameDto) {
    return this.savegamesService.create(createSavegameDto);
  }

  @Get()
  @ApiBearerAuth()
  @ApiFoundResponse({ type: SavegameDto, isArray: true })
  findAll() {
    return this.savegamesService.findAll();
  }

  @Get(':id')
  @ApiFoundResponse({ type: SavegameDto })
  findOne(@Param('id') id: string) {
    return this.savegamesService.findOne(id);
  }

  @Get(':id/filltypes')
  @ApiFoundResponse({ type: FillTypeDto, isArray: true })
  findFillTypes(@Param('id') id: string) {
    return this.fillTypeService.findForSavegame(id);
  }

  @Put(':id/filltypes')
  @ApiBody({ type: [CreateFillTypeDto] })
  @ApiFoundResponse({ type: SavegameDto })
  updateFillTypes(@Param('id') id: string, @Body() body: CreateFillTypeDto[]) {
    return this.fillTypeService.setForSavegame(id, body);
  }

  @Get(':id/sellstations')
  @ApiFoundResponse({ type: SellStationDto, isArray: true })
  findSellstations(@Param('id') id: string) {
    return this.sellStationsService.findForSavegame(id);
  }

  @Put(':id/sellstations')
  @ApiBody({ type: [CreateSellStationDto] })
  @ApiFoundResponse({ type: SavegameDto })
  updateSellStations(
    @Param('id') id: string,
    @Body() body: CreateSellStationDto[],
  ) {
    return this.sellStationsService.setForSavegame(id, body);
  }

  @Patch(':id')
  @ApiOkResponse({ type: SavegameDto })
  update(
    @Param('id') id: string,
    @Body() updateSavegameDto: UpdateSavegameDto,
  ) {
    return this.savegamesService.update(+id, updateSavegameDto);
  }

  @Delete(':id')
  @ApiNoContentResponse()
  remove(@Param('id') id: string) {
    return this.savegamesService.remove(+id);
  }

  @Post(':id/filltypes')
  createFillType(
    @Param('id') savegameId: string,
    @Body() data: CreateFillTypeDto,
  ) {
    return this.fillTypeService.createOne({ savegameId, ...data });
  }

  @Patch(':id/filltypes/index/:index/prices')
  pushFillTypePrice(
    @Param('id') savegameId: string,
    @Param('index') fillTypeIndex: string,
    @Body() prices: CreatePriceHistoryDto[],
  ) {
    return this.fillTypeService.pushPricesForType(
      savegameId,
      fillTypeIndex,
      prices,
    );
  }
}
