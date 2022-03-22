import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import UserController from '@infra/http/controllers/SessionController';

const usersRouter = Router();

usersRouter.post(
  '/login',
  celebrate(
    {
      [Segments.BODY]: {
        email: Joi.string().email().required(),
        password: Joi.string().required(),
      },
    },
    { abortEarly: false }
  ),
  UserController.create
);

export default usersRouter;
