import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users', (table) => {
    table.uuid('id').primary().defaultTo(knex.fn.uuid());
    table.uuid('auth_id').notNullable().index().unique();
    table.string('profile_url').index().unique();
    table.string('handle').index().unique();
    table.string('first_name').notNullable();
    table.string('last_name').notNullable();
    table.string('avatar_url');
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('users');
}
