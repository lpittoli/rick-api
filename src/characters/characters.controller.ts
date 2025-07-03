import { Controller, Get, Param, Query, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { CharactersService } from './characters.service';
import { JwtGuard } from '../auth/jwt.guard';

const requestCountMap = new Map<string, number>();

@Controller('characters')
export class CharactersController {
  constructor(private charactersService: CharactersService) {}

  private getKey(req: any): string {
    return req.user?.userId?.toString() || req.ip;
  }

  private checkLimit(req: any): void {
    const key = this.getKey(req);
    const isAuthenticated = !!req.user;
    const limit = isAuthenticated ? 10 : 3;
    const current = requestCountMap.get(key) || 0;

    if (current >= limit) {
      throw new UnauthorizedException('Limite de requisições atingido');
    }

    requestCountMap.set(key, current + 1);
  }

  @Get(':id')
  async getById(@Param('id') id: number, @Req() req) {
    this.checkLimit(req);
    return this.charactersService.getCharacterById(id);
  }

  @Get()
  async getByName(@Query('name') name: string, @Req() req) {
    this.checkLimit(req);
    return this.charactersService.getCharacterByName(name);
  }
}