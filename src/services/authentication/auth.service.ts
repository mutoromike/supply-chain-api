// user.service.ts
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  UserType,
  LoginResponse,
  RegisterResponse,
} from 'src/common/types/auth';
import { CreateUserDto, LoginUserDto } from '../../common/dtos/auth.dto';
import {
  createUser,
  findUserByEmail,
} from '../../repositories/authentication/authRepository';
import { validatePassword } from '../../common/utils/passwordUtils';
import { mapUserToUserType } from 'src/common/mappers/userMapper';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async registerUser(createUserDto: CreateUserDto): Promise<RegisterResponse> {
    try {
      const user = await createUser(createUserDto);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'User created successfully',
        user: mapUserToUserType(user),
      };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new HttpException('Email already exists', HttpStatus.CONFLICT);
        }
        throw new HttpException('An Error Occurred', HttpStatus.BAD_REQUEST);
      }
      throw new HttpException('An Error Occurred', HttpStatus.BAD_REQUEST);
    }
  }

  async loginUser(
    loginUserDto: LoginUserDto,
  ): Promise<LoginResponse | HttpStatus> {
    const user = await findUserByEmail(loginUserDto.email);
    if (!user) {
      throw new HttpException(
        'Invalid email or password',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const isPasswordValid = await validatePassword(
      loginUserDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new HttpException(
        'Invalid email or password',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const token = this.jwtService.sign(
      { userId: user.id },
      { expiresIn: '1h' },
    );

    const data = {
      user: mapUserToUserType(user),
      token: token,
    };

    return {
      statusCode: HttpStatus.OK,
      message: 'Login successful',
      data: data,
    };
  }
}
