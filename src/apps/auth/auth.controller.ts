import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Public } from 'src/common/jwt.strategy';
import { Response } from 'express';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() data: CreateUserDto) {
    return await this.authService.create(data);
  }

  @Post('login')
  async login(@Body() data: CreateUserDto) {
    return await this.authService.login(data);
  }
}
