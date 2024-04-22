import express from "express";
import path from "path";
import mongoose from "mongoose";
import MessageRouter from "./request/message.request.js";

const app = express();
app.use(express.json());
const MONGOOSE_URL =
  "mongodb+srv://expressjs:express@expressjs.5mohvpi.mongodb.net/expressjs?retryWrites=true&w=majority&appName=expressjs";
app.listen(5000, () => {
  console.log("running on server 5000");
});

app.get("/api/post/:user", async (req, res) => {
  const username = req.params.name; // Change req.params.name to req.params.user
  try {
    const comments = await Comment.find({ username });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

mongoose
  .connect(MONGOOSE_URL)
  .then(() => {
    console.log("Connected");
  })
  .catch((error) => {
    console.log("Error while connecting", error.message);
  });

app.use("/api/post", MessageRouter);

const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});
