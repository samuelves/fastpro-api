import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import IUserRepository from '@usecases/user/repository/ICreateUsersRepository';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';

import User from '@infra/typeorm/entities/User';

import AppError from '@presentation/errors/AppError';

interface IRequest {
  name: string;
  email: string;
  password: string;
  bio: string;
}

@injectable()
class CreateUserService {
  private usersRepository: IUserRepository;
  private hashProvider: IHashProvider;

  constructor(
    @inject('UsersRepository')
    usersRepository: IUserRepository,
    @inject('HashProvider')
    hashProvider: IHashProvider
  ) {
    this.usersRepository = usersRepository;
    this.hashProvider = hashProvider;
  }

  public async execute({
    name,
    email,
    password,
    bio,
  }: IRequest): Promise<User> {
    if (await this.usersRepository.findByEmail(email)) {
      throw new AppError('Email address already used.', 401);
    }

    const hash_password = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      name,
      email,
      encrypted_password: hash_password,
      bio,
    });

    return user;
  }
}

export default CreateUserService;
