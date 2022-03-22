import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import SwapiPersonService from '@usecases/swapiPerson/SwapiPersonService';

class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { page } = request.query;
    const servicePerson = container.resolve(SwapiPersonService);
    const person = await servicePerson.execute(String(page ?? 1));
    if (person.status === 404) {
      return response.status(404).json({
        message: 'Not Found',
      });
    }
    return response.status(200).json(classToClass(person));
  }

  public async index(_request: Request, response: Response): Promise<Response> {
    return response.status(200).json({
      message: 'Hello World',
    });
  }
}

export default new UsersController();
