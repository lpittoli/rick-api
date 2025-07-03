import { IsNumber, IsString } from 'class-validator';

export class CreateFavoriteDto {
  @IsNumber()
  characterId: number;

  @IsString()
  name: string;
}
