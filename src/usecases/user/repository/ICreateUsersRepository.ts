import User from '@modules/users/infrastructure/typeorm/entities/User';
import ICreateUserDTO from '@usecases/user/dtos/ICreateUserDTO';

export default interface ICreateUsersRepository {
  create(data: ICreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  findAll(): Promise<User[] | undefined>;
}
