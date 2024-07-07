const Meeting = require("../models/Meeting");
const User = require("../models/User");

//get All Meetings
exports.getAllMeetings = async function () {
  try {
    return await Meeting.find()
    .populate("user")
    .populate("consultant");
  } catch (e) {
    throw Error("Error while finding Meetings" + e);
  }
};

//get meeting by id
exports.getMeeting = async function (id) {
  try {
    return await Meeting.findById(id).populate("user");
  } catch (err) {
    throw Error("Error while getting meeting");
  }
};

//update meeting
exports.updateMeeting = async function (id, data) {
  try {
    return await Meeting.findByIdAndUpdate(id, data, {
      new: true,
    });
  } catch (err) {
    throw Error("Error while updating Meeting");
  }
};

//delete Meeting
exports.deleteMeeting = async function (id, body) {
  try {
    await Meeting.findByIdAndDelete(id);
    return 'chapter deleted successfully'
  } catch (err) {
    console.log('errrrrrr', err)
    throw Error("Error while updating meeting");
  }
};

//add chapter
exports.addMeeting = async function (body, user) {
  try {
    const { user, consultant, roomId, date, category, status, comment } = body;
    const meeting = new Meeting({
      user,
      consultant,
      roomId,
      date,
      category,
      status,
      comment
    });
    meeting.save();
    return meeting
  } catch (err) {
    console.log('errrrrrrrr', err)
    throw Error("Error while adding meeting");
  }
};
