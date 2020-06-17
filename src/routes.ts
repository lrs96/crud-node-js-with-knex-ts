import express from 'express';

import User from './controllers/User';

const routes = express.Router();
const user = new User();

routes.get("/list-users/", user.show)
routes.post('/create-users/', user.create);
routes.get('/update-user/:id', user.update)
routes.delete('delete-user/<:id>', user.delete)

export default routes;