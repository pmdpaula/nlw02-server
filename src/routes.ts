/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import express from 'express';
import db from './database/connection';
import convertHourToMinutes from './utils/convertHourToMinutes';

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

const routes = express.Router();

interface ScheduleItem {
  week_day: number,
  from: string,
  to: string
}

routes.get('/', (request, response) => response.json({ message: 'Hello Pedrão!' }));

routes.post('/classes', async (request, response) => {
  const {
    name,
    avatar,
    whatsapp,
    bio,
    subject,
    cost,
    schedule,
  } = request.body;

  // Cria uma transação para ou executar tudo ou fazer rollback
  const trx = await db.transaction();

  try {
    const insertedUsersIds = await trx('users').insert({
      name,
      avatar,
      whatsapp,
      bio,
    });

    const insertedClassesIds = await trx('classes').insert({
      subject,
      cost,
      user_id: insertedUsersIds[0],
    });

    const classSchedule = schedule.map((scheduleItem: ScheduleItem) => ({
      class_id: insertedClassesIds,
      week_day: scheduleItem.week_day,
      from: convertHourToMinutes(scheduleItem.from),
      to: convertHourToMinutes(scheduleItem.to),
    }));

    await trx('class_schedule').insert(classSchedule);

    await trx.commit();

    return response.status(201).send();
  } catch (err) {
    trx.rollback();
    return response.status(400).json({
      error: 'Unexpected error while creating new class',
    });
  }
});

export default routes;
