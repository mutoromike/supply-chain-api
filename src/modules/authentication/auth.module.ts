import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/common/utils/jwt.strategy';
import { AuthController } from 'src/controllers/authentication/auth.controller';
import { PrismaService } from 'src/prisma.service';
import { AuthService } from 'src/services/authentication/auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, PrismaService],
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '1h' },
    }),
  ],
})
export class AuthModule {}
