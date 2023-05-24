import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('recipe', (table) => {
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary()
    table.string('title')
    table.string('description')
    table.string('avatar')
    table.string('time')
    table.decimal('difficulty', 10, 1).notNullable()
    table.uuid('user_id').unsigned()
    table.foreign('user_id').references('id').inTable('users')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('recipe')
}
