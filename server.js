//import express
const express = require('express');

//import data from actions/projects
const projectsRouter = require('./data/router/projectsRouter');

//import logger middleware from utils
const { logger } = require('./utils/logger.js');

//declare server using express
const server = express();

//tell server how to handle incoming requests (as JSON objects)
server.use(express.json())

//tell server to use custom middleware
server.use(logger);

//tell server to use routes/endpoints
server.use("/api/projects", projectsRouter)

//code from project clone
server.get('/', (req, res) => {
    res.send(`<h2>Node Sprint Projects and Actions!</h2>`);
});

//export
module.exports = server;