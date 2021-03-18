const mongoose = require("mongoose");

const GroupRequest = mongoose.model(
  "GroupRequest",
  new mongoose.Schema({
    status: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
    group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Group"
      }
    
  })
);

module.exports = GroupRequest;