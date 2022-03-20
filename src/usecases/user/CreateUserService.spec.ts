import CreateUserService from '@usecases/user/CreateUserService';

import FakeUsersRepository from '@usecases/user/repository/mocks/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';

import AppError from '@presentation/errors/AppError';

let createUserService: CreateUserService;

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );
  });

  it('should be able create a new user', async () => {
    const user = await createUserService.execute({
      name: 'Maria',
      email: 'maria@example.com',
      password: 'password',
      bio: 'bio example',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not create a user with E-mail already taken', async () => {
    await createUserService.execute({
      name: 'joao',
      email: 'joao@example.com',
      password: 'password',
      bio: 'bio example',
    });

    await expect(
      createUserService.execute({
        name: 'joao',
        email: 'joao@example.com',
        password: 'password',
        bio: 'bio example',
      })
    ).rejects.toBeInstanceOf(AppError);
    // Usamos o "rejects" quando o teste for cair em um Error.
  });
});
