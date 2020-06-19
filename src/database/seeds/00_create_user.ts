import Knex from 'knex';

export async function seed(knex: Knex) {
    await knex('users').insert([
        {
            name: "Rodrigo",
            lastname:"Carvalho dos Silva",
            email: "rodrigo@carvalhosantos.com.br",
            age: "30"
        }
    ])
}