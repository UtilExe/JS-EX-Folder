
import express from "express";
import dotenv from "dotenv";
import path from "path"
dotenv.config()
const app = express()

import friendsRoutes from "./routes/FriendRoutes";

// Midleware
app.use(express.static(path.join(process.cwd(), "public")))

// This middleware lets us use req.body instead of it becoming undefined, when we post data as json format.
app.use(express.json())

app.use("/api/friends", friendsRoutes)

app.get("/demo", (req, res) => {
  res.send("Server is up!");
})



export default app;