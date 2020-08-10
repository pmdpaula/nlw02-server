/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */

/**
 * GET:     Buscar ou listar uma informação
 * POST:    Criar uma nova informação
 * PUT:     Atualizar uma informação
 * DELETE:  Deletar uma informação
 *
 * * Corpo (Request Body): Dados para criação ou atualização de um registro
 * Route Params:  Identificar qual recurso eu quero atualizar ou deleter (:id)
 * Query Params:  Paginação, filtros, ordenação (?page=XX&sort=name)
 */

import express from 'express';
import ClassesControler from './controllers/ClassesController';
import ConnectionsController from './controllers/ConnectionsController';

const routes = express.Router();
const classesControllers = new ClassesControler();
const connectionsController = new ConnectionsController();

routes.get('/classes', classesControllers.index);
routes.get('/allclasses', classesControllers.indexesFromClass);
routes.post('/classes', classesControllers.create);

routes.post('/connections', connectionsController.create);
routes.get('/connections', connectionsController.index);

export default routes;
