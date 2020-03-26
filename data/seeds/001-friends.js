exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("friends")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("friends").insert([
        { name: "Sage", handle: "sage-jordan" },
        { name: "Sage2", handle: "sage-jordan2" },
        { name: "Sage3", handle: "sage-jordan3" }
      ]);
    });
};
