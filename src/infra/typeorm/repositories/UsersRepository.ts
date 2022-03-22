import { getRepository, Repository } from 'typeorm';

import User from '@infra/typeorm/entities/User';
import ICreateUserDTO from '@usecases/user/dtos/ICreateUserDTO';
import ICreateUsersRepository from '@usecases/user/repository/ICreateUsersRepository';

class UsersRepository implements ICreateUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(userData);

    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id);

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: {
        email: email,
      },
    });

    return user;
  }

  public async findAll(): Promise<User[] | undefined> {
    const users = await this.ormRepository.find({
      select: ['id', 'name', 'phone'],
    });

    return users;
  }
}

export default UsersRepository;
