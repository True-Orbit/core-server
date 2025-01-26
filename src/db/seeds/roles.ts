import { type Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('roles').del();

  await knex('roles').insert([
    { id: 1, name: 'user', description: 'normal user' },
    { id: 2, name: 'admin', description: 'admin user' },
  ]);
}
