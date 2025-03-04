import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('services', (table) => {
    table.uuid('id').primary().defaultTo(knex.fn.uuid());
    table.uuid('api_key').notNullable().index().unique();
    table.string('name').notNullable();
    table.timestamps(true, true);
  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('services');
}

