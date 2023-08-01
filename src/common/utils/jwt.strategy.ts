// validate jwt token
// Path: src/common/utils/jwt.strategy.ts

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { User } from '@prisma/client';
import { findUserById } from '../../repositories/authentication/authRepository';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly prismaService: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET_KEY,
    });
  }

  async validate(payload: { userId: string }): Promise<User> {
    const user = await findUserById(payload.userId);
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
