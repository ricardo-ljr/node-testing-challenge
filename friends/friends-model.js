const db = require("../data/dbConfig");

module.exports = {
  getAll,
  insert,
  remove
};

function getAll() {
  return db("friends");
}

async function insert(friend) {
  return db("friends")
    .insert(friend, "id")
    .then(ids => {
      const [id] = ids;

      return db("friends")
        .where({ id })
        .first();
    });
}

function remove(id) {
  let deleteFriend = {};
  db("friends")
    .where({ id })
    .first()
    .then(friend => {
      deleteFriend = friend;
    });
  return db("friends")
    .where("id", id)
    .del()
    .then(count => {
      if (count > 0) {
        return deleteFriend;
      }
    });
}
