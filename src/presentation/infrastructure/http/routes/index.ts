import { Router } from 'express';

import usersRouter from '@infra/http/routes/user.routes';
import sessionsRouter from '@infra/http/routes/sessions.routes';
import swapiPersonRouter from '@infra/http/routes/swapiPerson.route';
const routes = Router();

routes.post('/register', usersRouter);
routes.get('/swapi/person', swapiPersonRouter);

routes.post('/login', sessionsRouter);

export default routes;
