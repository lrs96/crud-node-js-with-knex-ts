import express from 'express';

import User from './controllers/User';

const routes = express.Router();
const user = new User();

routes.get("/list-users/", user.show)
routes.get("/list-user/:id", user.show_user)
routes.post('/create-user/', user.create);
routes.put('/update-user/:id', user.update)
routes.delete('/delete-user/:id', user.delete)

export default routes;