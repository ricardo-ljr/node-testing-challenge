const express = require("express");

const friendsRouter = require("../friends/friends-router");
const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.send({ api: "up" });
});

server.use("/api/friends", friendsRouter);

module.exports = server;
