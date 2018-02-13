
exports.up = function (knex, Promise) {
    return Promise.all([
        // Begin of Users Tables
        knex.schema.createTable('users', (tbl) => {
            tbl.increments('id').primary().notNullable();
            tbl.string('email', 255).notNullable().unique('email', 'uq_email');
            tbl.string('password', 255).notNullable();
            tbl.timestamp('createdAt').defaultTo(knex.fn.now());
        }),
        knex.schema.createTable('usersLog', (tbl) => {
            tbl.increments('id').primary().notNullable();
            tbl.timestamp('acess').defaultTo(knex.fn.now());
            tbl.integer('userId').references('id').inTable('users').notNullable();
        }),
        // End Users Tables
        // Begin SOAP Individual Tables
        knex.schema.createTable('keys', (tbl) => {
            tbl.increments('id').primary().notNullable();
            tbl.string('description', 255).notNullable();
            tbl.boolean('active').notNullable().defaultTo(false);
            tbl.text('positive').notNullable().defaultTo('');
            tbl.text('negative').notNullable().defaultTo('');
            tbl.integer('position').notNullable().defaultTo(0);
        }),
        knex.schema.createTable('keyGroups', (tbl) => {
            tbl.increments('id').primary().notNullable();
            tbl.string('description', 64).notNullable().defaultTo('');
            tbl.string('separator', 12);
            tbl.boolean('toggle').notNullable().defaultTo(false);
            tbl.boolean('single').notNullable().defaultTo(true);
            tbl.integer('position').notNullable().defaultTo(0);
        }),
        knex.schema.createTable('divisions', (tbl) => {
            tbl.increments('id').primary().notNullable();
            tbl.string('description', 64).notNullable();
            tbl.integer('position').notNullable().defaultTo(0);
        }),
        knex.schema.createTable('soap', (tbl) => {
            tbl.increments('id').primary().notNullable();
            tbl.string('description', 64).notNullable();
            tbl.integer('position').notNullable().defaultTo(0);
        }),
        // Begin SOAP Joint Tables
        knex.schema.createTable('keyGroup_keys', (tbl) => {
            tbl.increments('id').primary().notNullable();
            tbl.integer('groupId').references('id').inTable('keyGroups').notNullable();
            tbl.integer('keyId').references('id').inTable('keys').notNullable();
        }),
        // What Groups of Keys belong inside what division
        knex.schema.createTable('division_keygroups', (tbl) => {
            tbl.increments('id').primary().notNullable();
            tbl.integer('divisionId').references('id').inTable('divisions').notNullable();
            tbl.integer('groupId').references('id').inTable('keyGroups').notNullable();
        }),
        // What divisions belong inside what soap section
        knex.schema.createTable('soap_divisions', (tbl) => {
            tbl.increments('id').primary().notNullable();
            tbl.integer('soapId').references('id').inTable('soap').notNullable();
            tbl.integer('divisionId').references('id').inTable('divisions').notNullable();
        }),

    ])
};

exports.down = function (knex, Promise) {

};
