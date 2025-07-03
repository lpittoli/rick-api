import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateFavoriteDto {
  @IsString()
  @ApiProperty({ example: 'Rick Sanchez' })
  name: string;
}
