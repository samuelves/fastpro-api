import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import SwapiPersonService from '@usecases/swapiPerson/SwapiPersonService';

class UsersController {
  public async create(
    _request: Request,
    response: Response
  ): Promise<Response> {
    const createUser = container.resolve(SwapiPersonService);
    const user = await createUser.execute();
    return response.status(200).json(classToClass(user));
  }

  public async index(_request: Request, response: Response): Promise<Response> {
    return response.status(200).json({
      message: 'Hello World',
    });
  }
}

export default new UsersController();
