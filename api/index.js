const express = require("express");
const port = process.env.PORT || 5000;
const cors = require("cors");
const app = require("express")();
const mongoose = require("mongoose");
require('dotenv').config()

mongoose.connect(process.env.MONGO_URI);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));

app.use(cors());
app.use(express.json());

const robotSchema = new mongoose.Schema({
  robotName: String,
  currentDate: String,
  color: String,
});

const Robot = mongoose.model("robots", robotSchema);

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

app.listen(port, () => {
  console.log("Now listening on http://localhost:" + port);
});