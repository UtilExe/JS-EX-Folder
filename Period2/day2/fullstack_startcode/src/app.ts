
import express from "express";
import dotenv from "dotenv";
dotenv.config()
import path from "path"
const app = express()
import friendsRoutes from "./routes/FriendRoutes";
const debug = require("debug")("app")
import { Request, Response, NextFunction } from "express"
import { ApiError } from "./errors/apiError";

import logger, { stream } from "./middleware/logger";
import authMiddleware from "./middleware/basic-auth";
const morganFormat = process.env.NODE_ENV == "production" ? "combined" : "dev"
app.use(require("morgan")(morganFormat, { stream }));
logger.log("info", "Server started");

// Væsentligt med middelware, at vi sætter det, det rigtige sted.

// CORS manually + headers.
/*app.use((request, response, next) => {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})*/

// This middleware lets us use req.body instead of it becoming undefined, when we post data as json format.
app.use(express.json())

// Please verify whether this works (requires app in your DEBUG variable, like DEBUG=www,app)
// If not replace with a console.log statement, or better the "advanced logger" refered to in the exercises
// SIMPLE LOGGER
app.use((req, res, next) => {
  //console.log("Time", new Date().toISOString(), ", The HTTP method:", req.method, ", URL:", req.originalUrl, ", The remote IP:", req.ip)
  debug("Time", new Date().toISOString(), ", The HTTP method:", req.method, ", URL:", req.originalUrl, ", The remote IP:", req.ip)
  next()
})



// Mere Midleware....
app.use(express.static(path.join(process.cwd(), "public")))

// cors are only being used on the below endpoints (our api etc. - not the above ones - as intended)
// Own CORS Middleware
/*import cors from "./middleware/myCors"
app.use(cors);*/

app.use("/api/friends", friendsRoutes)

// 404 handlers for api-requests
app.use("/api", (req, res, next) => {
  res.status(404).json({ errorCode: 404, msg: "Not found" })
})

app.use("/", authMiddleware)
app.get("/demo", (req, res) => {
  res.send("Server is up!");
})
app.get("/me", (req:any, res) => {
  const user = req.credentials;
  res.json(user);
})

// types are from import {Request, Response} from "express"
// //Makes JSON error-response for ApiErrors, otherwise pass on to default error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof (ApiError)) {
    const errorCode = err.errorCode ? err.errorCode : 500
      res.status(errorCode).json({ errorCode: 404, msg: "Not found" })
  } else {
    next(err)
  }
})

export default app;