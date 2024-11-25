import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { CurrentUser } from 'src/common/current-user.decorator';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  async getUser(@CurrentUser() clerkId: string) {
    return await this.userService.getUser(clerkId);
  }
}
