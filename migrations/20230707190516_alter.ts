import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable('recipe', (table) => {
        table.enum('new_difficulty', ['FACIL', 'MEDIO', 'DIFICIL']).notNullable().defaultTo('MEDIO');
      });
      
      
      await knex.schema.alterTable('recipe', (table) => {
        table.dropColumn('difficulty');
        table.renameColumn('new_difficulty', 'difficulty');
      });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable('recipe', (table) => {
        table.decimal('new_difficulty', 10, 1).notNullable();
      });
    await knex.schema.alterTable('recipe', (table) => {
    table.dropColumn('difficulty');
    table.renameColumn('new_difficulty', 'difficulty');
    });
}

