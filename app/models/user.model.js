const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    firstname: String,
    lastname: String,
    username: {type: String, unique: true},
    email: String,
    password: String,
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ],
    request:[
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Request"
      }
    ]
  })
);

module.exports = User;