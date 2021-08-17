import { Router } from 'express';
import FinanceControllController from './app/controllers/FinanceControllController';
import GroupControllController from './app/controllers/GroupControllController';
import CategoryController from './app/controllers/CategoryController';
import JournalEntryController from './app/controllers/JournalEntryController';

const routes = new Router();

routes.post('/finance-controll', FinanceControllController.create);
routes.get('/finance-controll/:id', FinanceControllController.show);
routes.post('/group-controll', GroupControllController.create);
routes.get('/category', CategoryController.index);
routes.post('/category', CategoryController.create);
routes.get('/journal-entry', JournalEntryController.index);
routes.post('/journal-entry', JournalEntryController.create);

export default routes;
