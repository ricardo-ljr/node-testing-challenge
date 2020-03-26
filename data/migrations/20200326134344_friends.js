exports.up = function(knex) {
  return knex.schema.createTable("friends", tbl => {
    tbl.increments();

    tbl.string("name", 255).notNullable();

    tbl.string("handle", 255).unique();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("friends");
};
