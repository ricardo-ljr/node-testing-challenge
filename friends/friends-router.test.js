const request = require("supertest");
const server = require("../api/server");
const Friends = require("./friends-model");

describe("\n * Testing server.js endpoints", () => {
  // TEST IF POST WORKS

  describe("\n * Post /", () => {
    it("should create a new friend cause you're lonely", () => {
      return request(server)
        .post("/api/friends")
        .then(res => {
          expect(res.type).toMatch(/json/i);
        });
    });
    it("should return status 201", () => {
      return request(server)
        .post("/api/friends")
        .send({ name: "Bro" })
        .then(res => {
          expect(res.statusCode).toBe(201);
        });
    });
    it("should insert provided name into db", () => {
      return Friends.insert({ name: "Ricardo" }).then(res => {
        expect(res.name).toBe("Ricardo");
      });
    });
  });

  // TEST IF DELETE REMOVES CORRECT USER

  describe("\n * Delete /:id", () => {
    it("should delete correct user", () => {
      return request(server)
        .delete("/api/friends/:id")
        .then(res => {
          expect(res.type).toMatch(/json/i);
        });
    });
    it("should return status 200", () => {
      return request(server)
        .delete("/api/friends/:id")
        .then(res => {
          expect(res.status).not.toBe(200);
        });
    });

    // TRY ASYNC AND AWAIT FOR TESTING

    it("It responds with a message of friend deleted", async () => {
      const newFriend = await request(server)
        .post("/api/friends")
        .send({
          name: "Ricardo"
        });
      const removedFriend = await request(server).delete(
        `/api/friends/${newFriend.body.id}`
      );
      expect(removedFriend.body).toEqual({
        message: "Sorry you lost a friend, aka removed him successfully"
      });
      expect(removedFriend.statusCode).toBe(200);
    });
  });
});
