/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('geo_figures', function (table) {
        table.increments('id').primary();
        table.string('hash').notNullable();
        table.specificType('geom', 'geometry(Polygon, 4326)').notNullable();
        table.string('information');
        table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('geo_figures');
};
