import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
type UserPayload = { id: number };


@Injectable()
export class FavoritesService {
  constructor(private prisma: PrismaService) {}

  async addFavorite(user: any, characterId: number, name: string) {
  if (!user?.id) {
    throw new BadRequestException('Usuário inválido');
  }

  const count = await this.prisma.favorite.count({
    where: { userId: user.id },
  });

  if (count >= 3) {
    throw new BadRequestException('Limite de 3 favoritos atingido');
  }

  return this.prisma.favorite.create({
    data: {
      characterId,
      name,
      user: {
        connect: { id: user.id },
      },
    },
  });
}


  async listFavorites(user: UserPayload) {
    return this.prisma.favorite.findMany({ where: { userId: user.id } });
  }

  async removeFavorite(id: number, user: UserPayload) {
    const fav = await this.prisma.favorite.findFirst({
      where: { id, userId: user.id },
    });
    if (!fav) throw new NotFoundException('Favorito não encontrado');
    return this.prisma.favorite.delete({ where: { id } });
  }

  async updateFavorite(id: number, name: string, user: UserPayload) {
    const fav = await this.prisma.favorite.findFirst({
      where: { id, userId: user.id },
    });
    if (!fav) throw new NotFoundException('Favorito não encontrado');
    return this.prisma.favorite.update({ where: { id }, data: { name } });
  }

  async getOne(user: UserPayload, id: number) {
    const fav = await this.prisma.favorite.findFirst({
      where: { id, userId: user.id },
    });
    if (!fav) throw new NotFoundException('Favorito não encontrado');
    return fav;
  }
}
