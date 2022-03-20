import { Router } from 'express';
import SwapiPersonController from '@infra/http/controllers/SwapiPersonController';
import ensureAuthentication from '@infra/http/middlewares/EnsureAuthentication';
const usersRouter = Router();

usersRouter.get(
  '/swapi/person',
  ensureAuthentication,
  SwapiPersonController.create
);

export default usersRouter;
