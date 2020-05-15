const supertest = require("supertest");
const server = require("../../index");
const db = require("../config");

beforeEach(async () => {
    await db.seed.run();
});

afterAll(async () => {
    await db.destroy();
});

describe("TESTING INTEGRATION", () => {
    test("POSTING messages", async () => {
        const data = {
            title: "test message",
            contents: "This is purely a test message",
        };

        const res = await supertest(server).post("/messages").send(data);
        expect(res.statusCode).toBe(200);
        expect(res.type).toBe("application/json");
        expect(res.body.title).toBe("test message");
        expect(res.body.contents).toMatch(/purely/i);
    });

    test("DELETING message", async () => {
        const res = await supertest(server).delete("/messages/1");
        expect(res.statusCode).toBe(204);
        expect("/messages").toHaveLength(9);
    });
});
