// routes/studentroute.js

const express = require("express");
const fs = require("fs");
const path = require("path");

const studentrouter = express.Router();

const filePath = path.join(__dirname, "../data/students.json");
// Read Route ---> READ Method
studentrouter.get("/read", (req, res) => {
  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  res.status(200).send(data);
});

// Create Route ---> POST Method
studentrouter.post("/create", (req, res) => {
  const payload = req.body;
  console.log(payload);

  // 1. Read JSON data
  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  const stdata = data.student;

  stdata.push(payload);

  data.student = stdata;
  fs.writeFileSync(filePath, JSON.stringify(data));

  res.status(201).send({ msg: "New student Registered successfully" });
});

// Update Route ---> PUT Method
studentrouter.put("/update/:id", (req, res) => {
  const payload = req.body;

  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  const stdata = data.student;

  const updateddata = stdata.map((el) => {
    if (el.id == req.params.id) {
      return payload;
    } else {
      return el;
    }
  });

  data.student = updateddata;

  fs.writeFileSync(filePath, JSON.stringify(data));
  res.status(200).send({ msg: "Student record updated successfully" });
});

// Patch Route ---> PATCH Method
studentrouter.patch("/update/:id", (req, res) => {
  const payload = req.body;

  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  const stdata = data.student;

  const updateddata = stdata.map((el) => {
    if (el.id == req.params.id) {
      return { ...el, ...payload };
    } else {
      return el;
    }
  });

  data.student = updateddata;

  fs.writeFileSync(filePath, JSON.stringify(data));
  res.status(200).send({ msg: "Student record partially updated successfully" });
});

// Delete Route ---> DELETE Method
studentrouter.delete("/delete/:id", (req, res) => {
  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  const stdata = data.student;

  const filtereddata = stdata.filter((el) => el.id != req.params.id);

  data.student = filtereddata;

  fs.writeFileSync(filePath, JSON.stringify(data));
  res.status(200).send({ msg: "Student record deleted successfully" });
});

module.exports = { studentrouter };