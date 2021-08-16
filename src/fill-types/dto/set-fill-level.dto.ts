import { ApiProperty } from '@nestjs/swagger';

export class SetFillLevelDto {
  @ApiProperty()
  fillLevel: number;
}
