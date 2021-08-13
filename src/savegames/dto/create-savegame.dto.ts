import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateSavegameDto {
  @IsString()
  @ApiProperty()
  description: string;
}
