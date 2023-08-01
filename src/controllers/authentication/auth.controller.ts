import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../../services/authentication/auth.service';
import { CreateUserDto, LoginUserDto } from '../../common/dtos/auth.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('api/v1/auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(private readonly AuthService: AuthService) {}

  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.AuthService.registerUser(createUserDto);
  }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    const loginUser = this.AuthService.loginUser(loginUserDto);
    return loginUser;
  }
}
