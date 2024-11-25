import { clerkClient } from '@clerk/clerk-sdk-node';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from './jwt.strategy';
import { UserRepository } from 'src/apps/user/repository/user.repository';

@Injectable()
export class ClerkAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
    private configService: ConfigService,
    private userRepository: UserRepository,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const token = request.cookies.__session;
    const tokenForPostman = this.extractTokenFromHeader(request);

    if (!token && !tokenForPostman) {
      throw new UnauthorizedException('Authentication token is missing');
    }
    try {
      if (token) {
        const payload = await clerkClient.verifyToken(token);

        const user = await clerkClient.users.getUser(payload.sub);
        request['user_clerk_id'] = user.id;
      } else if (tokenForPostman) {
        const payload = await this.jwtService.verifyAsync(token, {
          secret: this.configService.get('JWT_SECRET'),
        });
        const user = await this.userRepository.findById(payload.sub);
        request['user_clerk_id'] = user.user_clerk_id;
      }
    } catch (e) {
      console.log(e);
      throw new UnauthorizedException('Invalid token');
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
