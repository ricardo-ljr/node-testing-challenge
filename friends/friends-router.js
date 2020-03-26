const express = require("express");

const router = express.Router();

const Friends = require("./friends-model");

// GET all friends
// /api/friends

router.get("/", (req, res) => {
  Friends.getAll()
    .then(friend => {
      res.status(200).json(friend);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "Couldn't get friends... Or maybe you have none" });
    });
});

// POST

router.post("/", (req, res) => {
  const friendData = req.body;
  Friends.insert(friendData)
    .then(friends => {
      res.status(201).json(friends);
    })
    .catch(err => {
      res.status(500).json({ error: "You sure you have friends?" });
    });
});

// DELETE

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  Friends.remove(id)
    .then(deleted => {
      if (deleted) {
        res.json({
          message: "Sorry you lost a friend, aka removed him successfully"
        });
      } else {
        res.status(404).json({ message: "Friend with this id ain't here" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "No friends to remove? Lucky you", err });
    });
});

module.exports = router;
