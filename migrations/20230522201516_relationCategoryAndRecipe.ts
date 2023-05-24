import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('recipe', (table) => {
    table.uuid('category_id').unsigned()
    table.foreign('category_id').references('id').inTable('category')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('recipe', (table) => {
    table.dropForeign('category_id')
    table.dropColumn('category_id')
  })
}
