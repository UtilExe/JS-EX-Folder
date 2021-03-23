
import express from "express";
import dotenv from "dotenv";
dotenv.config()
import path from "path"
const app = express()
import friendsRoutes from "./routes/FriendRoutes";
const debug = require("debug")("app")
import { Request, Response } from "express"
import { ApiError } from "./errors/apiError";

// Væsentligt med middelware, at vi sætter det, det rigtige sted.
app.use((req, res, next) => {
  //console.log("Time", new Date().toISOString(), ", The HTTP method:", req.method, ", URL:", req.originalUrl, ", The remote IP:", req.ip)
  debug("Time", new Date().toISOString(), ", The HTTP method:", req.method, ", URL:", req.originalUrl, ", The remote IP:", req.ip)
  next()
})



// Mere Midleware....
app.use(express.static(path.join(process.cwd(), "public")))

// This middleware lets us use req.body instead of it becoming undefined, when we post data as json format.
app.use(express.json())

app.use("/api/friends", friendsRoutes)

app.get("/demo", (req, res) => {
  res.send("Server is up!");
})

// 404 handlers for api-requests
app.use("/api", (req, res, next) => {
  res.status(404).json({ errorCode: 404, msg: "Not found" })
})

// 
// types are from import {Request, Response} from "express"
app.use((err: any, req: Request, res: Response, next: Function) => {
  if (err instanceof (ApiError)) {
    const errorCode = err.errorCode ? err.errorCode : 500
      res.status(errorCode).json({ errorCode: 404, msg: "Not found" })
  } else {
    next(err)
  }
})

export default app;