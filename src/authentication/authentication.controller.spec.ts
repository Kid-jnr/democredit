import { Test, TestingModule } from '@nestjs/testing';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';

describe('AuthenticationController', () => {
  let controller: AuthenticationController;

  const mockUserService = {
    registerUser: jest.fn((dto) => {
      return {
        user: {
          id: 1,
          name: dto.name,
          email: dto.email,
          balance: 0,
          created_at: '2023-01-11T20:32:59.000Z',
          updated_at: '2023-01-11T20:32:59.000Z',
        },
        message: 'Account created successfully',
        code: 201,
      };
    }),

    loginUser: jest.fn((dto) => {
      return {
        token: 'jwt_token',
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthenticationController],
      providers: [AuthenticationService],
    })
      .overrideProvider(AuthenticationService)
      .useValue(mockUserService)
      .compile();

    controller = module.get<AuthenticationController>(AuthenticationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('register user', () => {
    const dto = {
      name: 'normana2',
      email: 'normawn@Es2w.com',
      password: '@1Password',
    };

    expect(controller.registerUser(dto)).toEqual({
      user: {
        id: 1,
        name: dto.name,
        email: dto.email,
        balance: 0,
        created_at: '2023-01-11T20:32:59.000Z',
        updated_at: '2023-01-11T20:32:59.000Z',
      },
      message: 'Account created successfully',
      code: 201,
    });
  });

  it('login user', () => {
    const dto = {
      email: 'normawn@Eswmsadsdsdssisdsdl.com',
      password: '@1Password',
    };

    expect(controller.loginUser(dto)).toEqual({
      token: 'jwt_token',
    });
  });
});
