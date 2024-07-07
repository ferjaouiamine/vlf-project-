var mongoose = require("mongoose");

var MeetingSchema = new mongoose.Schema({
  status: {
    type: String,
  },
  category: {
    type: String,
  },
  date: {
    type: Date,
  },
  roomId: {
    type: String,
  },
  comment: {
    type: String,
  },
  user: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  ],
  consultant: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  ],
});

module.exports = mongoose.model("Meeting", MeetingSchema);
