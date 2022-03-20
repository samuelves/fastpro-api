import { container } from 'tsyringe';

import '@modules/users/providers';
import '@shared/container/providers';

import IUserRepository from '@usecases/user/repository/ICreateUsersRepository';
import UsersRepository from 'infra/typeorm/repositories/UsersRepository';

container.registerSingleton<IUserRepository>(
  'UsersRepository',
  UsersRepository
);
