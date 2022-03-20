import { Router } from 'express';

import rateLimiter from '@shared/infrastructure/http/middlewares/rateLimiter';

import usersRouter from 'infra/http/routes/user.routes';
import sessionsRouter from 'infra/http/routes/sessions.routes';

const routes = Router();

routes.use(rateLimiter);

routes.post('/users', usersRouter);
routes.get('/users', usersRouter);

routes.post('/session', sessionsRouter);

export default routes;
