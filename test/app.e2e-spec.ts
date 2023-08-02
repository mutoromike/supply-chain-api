import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from './../src/app.module';
import { AuthController } from '../src/controllers/authentication/auth.controller';
import { AuthService } from '../src/services/authentication/auth.service';
import { CreateUserDto } from '../src/common/dtos/auth.dto';
import { RegisterResponse, UserType } from 'src/common/types/auth';
import { JwtStrategy } from './../src/common/utils/jwt.strategy';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [JwtStrategy],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });
});

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  describe('register', () => {
    it('should return the registered user', async () => {
      const createUser: CreateUserDto = {
        firstName: 'Sam',
        lastName: 'Uncle',
        phone: '+254733698778',
        email: 'sam@sam.com',
        address: '31 Downing ST, London',
        password: 'qwqwqwE@2',
      };
      const createdUser: UserType = {
        id: 'sa34efdf-de5gd',
        firstName: 'Sam',
        lastName: 'Uncle',
        phone: '+254733698778',
        email: 'sam@sam.com',
        address: '31 Downing ST, London',
      };
      const registeredUser: RegisterResponse = {
        statusCode: 201,
        message: 'User created successfully',
        user: createdUser,
      };
      jest.spyOn(authService, 'registerUser').mockResolvedValue(registeredUser);

      const result: RegisterResponse = await controller.register(createUser);

      expect(result).toEqual(registeredUser);
    });
  });
});
