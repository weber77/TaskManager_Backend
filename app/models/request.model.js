const mongoose = require("mongoose");

const Request = mongoose.model(
  "Request",
  new mongoose.Schema({
    Status: Boolean,
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
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

module.exports = Request;