import { Router } from 'express';
import FinanceControllController from './app/controllers/FinanceControllController';
import GroupControllController from './app/controllers/GroupControllController';
import CategoryController from './app/controllers/CategoryController';
import EntryController from './app/controllers/EntryController';

const routes = new Router();

routes.post('/finance-controll', FinanceControllController.create);
routes.put('/finance-controll/:id', FinanceControllController.update);
routes.get('/finance-controll', FinanceControllController.index);
routes.get('/finance-controll/:id', FinanceControllController.get);
routes.delete('/finance-controll/:id', FinanceControllController.delete);

routes.post('/group-controll', GroupControllController.create);
routes.put('/group-controll/:id', GroupControllController.update);
routes.get('/group-controll/:financeControllId', GroupControllController.show);
routes.get('/get-group-controll/:id', GroupControllController.get);
routes.delete('/group-controll/:id', GroupControllController.delete);

routes.post('/category', CategoryController.create);
routes.get('/get-category/:id', CategoryController.get);
routes.get('/category', CategoryController.list);
routes.get('/category/:groupId', CategoryController.show);

routes.post('/entry', EntryController.create);
routes.put('/entry/:id', EntryController.update);
routes.get('/get-entry/:id', EntryController.get);
routes.get('/entry/:groupId', EntryController.show);
routes.get('/entry/:groupId/:categoryId', EntryController.details);

export default routes;
