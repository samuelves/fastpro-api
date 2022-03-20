import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AuthenticateUserService from '@usecases/auth/AuthenticateUserService';

class SessionController {
  public async create(request: Request, response: Response) {
    const { email, password } = request.body;

    const authenticateUser = container.resolve(AuthenticateUserService);

    const { user, token } = await authenticateUser.execute({ email, password });

    return response.status(200).json({
      user: classToClass(user),
      token,
    });
  }
}

export default new SessionController();
