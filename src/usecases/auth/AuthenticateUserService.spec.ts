import FakeUsersRepository from '@usecases/user/repository/mocks/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';

import AuthenticateUserService from '@usecases/auth/AuthenticateUserService';
import CreateUserService from '@usecases/user/CreateUserService';

import AppError from '@presentation/errors/AppError';

let authenticateUserService: AuthenticateUserService;
let createUserService: CreateUserService;

let usersRepository: FakeUsersRepository;
let hashProvider: FakeHashProvider;

describe('Authenticate User', () => {
  beforeEach(() => {
    usersRepository = new FakeUsersRepository();
    hashProvider = new FakeHashProvider();

    createUserService = new CreateUserService(usersRepository, hashProvider);

    authenticateUserService = new AuthenticateUserService(
      usersRepository,
      hashProvider
    );
  });

  it('should be able to authenticate a user', async () => {
    const user = await createUserService.execute({
      name: 'Pedro',
      email: 'pedro@example.com',
      password: 'password',
      bio: 'bio example',
    });

    const authenticateResponse = await authenticateUserService.execute({
      email: 'pedro@example.com',
      password: 'password',
    });

    expect(authenticateResponse).toHaveProperty('token');
    expect(authenticateResponse.user).toEqual(user); // expero que "authenticateResponse.user" seja igual a user;
  });

  it('should not authenticate a user with an email that does not exist', async () => {
    await expect(
      authenticateUserService.execute({
        email: 'mateus@mateus.com',
        password: 'password',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not authenticate a user with an invalid password', async () => {
    await createUserService.execute({
      name: 'Alexandre',
      email: 'alexandre@example.com',
      password: 'password',
      bio: 'bio example',
    });

    await expect(
      authenticateUserService.execute({
        email: 'alexandre@example.com',
        password: 'invalid password',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
