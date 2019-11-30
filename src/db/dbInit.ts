import knex from 'knex';
import { dbConfig } from './dbConfig'
const pg = knex(dbConfig);

export { pg }