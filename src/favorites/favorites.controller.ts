import {
  Controller, Post, Get, Delete, Put, Param, Body, Req, UseGuards,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { JwtGuard } from '../auth/jwt.guard';
import { CharactersService } from '../characters/characters.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiBody, ApiParam } from '@nestjs/swagger';

@ApiTags('Favorites')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('favorites')
export class FavoritesController {
  constructor(
    private favoritesService: FavoritesService,
    private charactersService: CharactersService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Adicionar um personagem favorito (máx 3)' })
  @ApiBody({ type: CreateFavoriteDto })
  add(@Req() req, @Body() body: CreateFavoriteDto) {
    return this.favoritesService.addFavorite(req.user, body.characterId, body.name);
  }

  @Get()
  @ApiOperation({ summary: 'Listar personagens favoritos' })
  list(@Req() req) {
    return this.favoritesService.listFavorites(req.user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover personagem favorito' })
  @ApiParam({ name: 'id', required: true })
  remove(@Param('id') id: number, @Req() req) {
    return this.favoritesService.removeFavorite(+id, req.user);
  }

  @Put(':id')
@ApiOperation({ summary: 'Atualizar nome do personagem favorito' })
@ApiParam({ name: 'id', required: true })
@ApiBody({ type: UpdateFavoriteDto })
update(
  @Param('id') id: number,
  @Body() body: UpdateFavoriteDto,
  @Req() req
) {
  console.log('Body recebido no update:', body);
console.log('Name:', body.name);

  return this.favoritesService.updateFavorite(+id, body.name, req.user);
}

  @Get(':id/episodes')
  @ApiOperation({ summary: 'Listar quantidade de episódios do personagem favorito' })
  @ApiParam({ name: 'id', required: true })
  async getEpisodesForFavorite(@Param('id') id: number, @Req() req) {
    const fav = await this.favoritesService.getOne(req.user, +id);
    const character = await this.charactersService.getCharacterById(fav.characterId);
    return {
      characterId: character.id,
      name: character.name,
      episodeCount: character.episode.length,
    };
  }

  @Get('episodes/total')
  @ApiOperation({ summary: 'Listar total de episódios únicos de todos os favoritos' })
  async getTotalEpisodes(@Req() req) {
    const favorites = await this.favoritesService.listFavorites(req.user);
    const episodeSet = new Set<string>();

    for (const fav of favorites) {
      const character = await this.charactersService.getCharacterById(fav.characterId);
      for (const ep of character.episode) {
        episodeSet.add(ep);
      }
    }

    return {
      totalUniqueEpisodes: episodeSet.size,
    };
  }
}