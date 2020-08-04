import knex from 'knex';
import path from 'path';

// migrations:    controlam as versões do banco de dados.
// Configurado no arquivo knexfile.ts
// No pacakage.json foi sobrescrito comandos do knex por não entender typescript

const db = knex({
  client: 'sqlite3',
  connection: {
    filename: path.resolve(__dirname, 'database.sqlite'),
  },
  useNullAsDefault: true,
});

export default db;
