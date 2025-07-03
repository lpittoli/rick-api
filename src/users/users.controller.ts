import { Controller, Get, Req, UseGuards, NotFoundException } from '@nestjs/common';
import { JwtGuard } from '../auth/jwt.guard';
import { UsersService } from './users.service';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';


@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtGuard)
  @Get('me')
  @ApiOperation({ summary: 'Retorna dados do usuário autenticado' })
   async getProfile(@Req() req) {
    const user = await this.usersService.findById(req.user.userId);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    return { id: user.id, username: user.username };
  }
}