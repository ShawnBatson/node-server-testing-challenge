const express = require("express");
const cors = require("cors");
const messagesRouter = require("./data/routers/messages-router");

const server = express();

const port = process.env.PORT || 5000;

server.use(express.json());
server.use(cors());

server.use("/messages", messagesRouter);
server.get("/", (req, res) => {
    res.json({
        message: "Welcome to our API",
    });
});

server.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({
        message: "Something went wrong",
    });
});

if (!module.parent) {
    //important to wrap server in an if if using testing
    server.listen(port, () => {
        console.log(`Running at http://localhost:${port}`);
    });
}
module.exports = server;
