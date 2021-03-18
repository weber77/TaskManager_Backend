const mongoose = require("mongoose");

const Task = mongoose.model(
  "Task",
  new mongoose.Schema({
    title: String,
    description: String,
    assignmentStatus: String,
    progressStatus: String,
    group : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Group"
      },
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
  })
);

module.exports = Task;