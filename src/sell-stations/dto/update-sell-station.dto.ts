import { PartialType } from '@nestjs/mapped-types';
import { CreateSellStationDto } from './create-sell-station.dto';

export class UpdateSellStationDto extends PartialType(CreateSellStationDto) {}
