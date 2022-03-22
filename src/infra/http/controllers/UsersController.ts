import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateUserService from '@usecases/user/CreateUserService';

class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password, phone } = request.body;
    const createUser = container.resolve(CreateUserService);
    const user = await createUser.execute({ name, email, password, phone });
    return response.status(200).json(classToClass(user));
  }

  public async index(_request: Request, response: Response): Promise<Response> {
    return response.status(200).json({
      message: 'Hello World',
    });
  }
}

export default new UsersController();
