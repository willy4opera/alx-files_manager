import express from "express";
/* eslint-disable and no-unused-vars */
import injectRoutes from "./routes";
import startServer from "./libs/boot";
import injectMiddlewares from "./libs/middlewares";

// Created the Express Server
const server = express();

injectMiddlewares(server);
injectRoutes(server);
startServer(server);

export default server;
