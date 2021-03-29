const mongoose = require("mongoose");

const Request = mongoose.model(
  "Request",
  new mongoose.Schema({
    status: Boolean, // false 
    type: String, // join or invitation
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