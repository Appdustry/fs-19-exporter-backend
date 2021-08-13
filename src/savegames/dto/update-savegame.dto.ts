import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { UpdateFillTypeDto } from '../../fill-types/dto/update-fill-type.dto';

export class UpdateSavegameDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  fillTypes?: UpdateFillTypeDto;

  @ApiPropertyOptional()
  @IsOptional()
  sellStations?: string;
}
