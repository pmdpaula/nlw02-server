import express from 'express';

const app = express();

app.use(express.json());

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

app.get('/', (request, response) => response.json({ message: 'Hello Pedrão!' }));

// app.post('/users', (request, response) => {
//   console.log(request.body);

//   const users = [
//     { name: 'Pedro', age: 42 },
//     { name: 'Patricia', age: 45 },
//   ];

//   return response.json(users);
// });

const port = 3333;
app.listen({ port });
