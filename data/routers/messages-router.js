const express = require("express");
const db = require("../config");

const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        const messages = await db("messages").select("*");
        res.json(messages);
    } catch (err) {
        next(err);
    }
});

router.post("/", async (req, res, next) => {
    try {
        const payload = {
            title: req.body.title,
            contents: req.body.contents,
        };
        const [id] = await db("messages").insert(payload);
        const message = await db("messages").where("id", id).first();
        res.json(message);
    } catch (err) {
        next(err);
    }
});

router.delete("/:id", async (req, res, next) => {
    try {
        await db("messages").where("id", req.params.id).del();
        res.status(204).end();
    } catch (err) {
        next(err);
    }
});

module.exports = router;
