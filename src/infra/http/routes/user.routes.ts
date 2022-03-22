import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import UserController from '@infra/http/controllers/UsersController';

import ensureAuthentication from '@infra/http/middlewares/EnsureAuthentication';

const usersRouter = Router();

usersRouter.post(
  '/register',
  celebrate(
    {
      [Segments.BODY]: {
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        phone: Joi.string().required(),
      },
    },
    { abortEarly: false }
  ),
  UserController.create
);

usersRouter.get('/register', ensureAuthentication, UserController.index);

export default usersRouter;
