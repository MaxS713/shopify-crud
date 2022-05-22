const express = require("express");
const port = process.env.PORT || 5000;
const cors = require("cors");
const app = require("express")();
const {v4} = require("uuid");
const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));

app.use(cors());
app.use(express.json());

const robotSchema = new mongoose.Schema({
  modelName: String,
  currentDate: String,
  color: String,
  type: String,
  quantity: Number,
});

const Robot = mongoose.model("robots", robotSchema);

app.get("/api", (req, res) => {
  const path = `/api/item/${v4()}`;
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
  res.end(`Hello! Go to item: <a href="${path}">${path}</a>`);
});

app.get("/api/item/:slug", (req, res) => {
  const {slug} = req.params;
  res.end(`Item: ${slug}`);
});

app.get("/api/get-all-robots", async (req, res) => {
  let allRobots = await Robot.find({});
  res.send(allRobots);
});

app.post("/api/add-robot", async (req, res) => {
  let robot = new Robot(req.body);
  let currentDate = new Date().toLocaleString();
  robot.currentDate = currentDate;
  await robot.save();
});

app.post("/api/delete-robot", async (req, res) => {
  await Robot.deleteOne(req.body);
});

app.post("/api/edit-robot", async (req, res) => {
  let robotToUpdate = await Robot.findById(req.body._id);
  if (req.body.modelName) {
    robotToUpdate.modelName = req.body.modelName;
  }
  if (req.body.quantity) {
    robotToUpdate.quantity = req.body.quantity;
  }
  if (req.body.color) {
    robotToUpdate.color = req.body.color;
  }
  if (req.body.type) {
    robotToUpdate.type = req.body.type;
  }
  await robotToUpdate.save();
});

app.listen(port, () => {
  console.log("Now listening on http://localhost:" + port);
});
