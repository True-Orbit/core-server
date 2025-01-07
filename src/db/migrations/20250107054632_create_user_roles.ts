import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('user_roles', (table) => {
    table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
    table.integer('role_id').unsigned().references('id').inTable('roles').onDelete('CASCADE');
    table.primary(['user_id', 'role_id']);
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('user_roles');
}

