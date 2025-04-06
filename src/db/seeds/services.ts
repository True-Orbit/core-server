import { type Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('services').insert([
    { id: 1, name: 'auth', api_key: 'testAuthApiKey' },
  ]);
}
