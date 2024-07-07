var MeetingService = require("../services/MeetingService");

//get All meetings
exports.getAllMeetings = async (req, res) => {
  try {
    const meetings = await MeetingService.getAllMeetings();
    res.status(200).json({ status: "success", data: { meetings } });
  } catch (err) {
    res.status(400).json({ status: "error", msg: err.message });
  }
};

//get meeting by id
exports.getMeeting = async (req, res) => {
  try {
    const meeting = await MeetingService.getMeeting(req.params.id);
    res.status(200).json({ status: "success", data: { meeting } });
  } catch (err) {
    res.status(400).json({ status: "error", msg: err.message });
  }
};

//update meeting
exports.updateMeeting = async (req, res) => {
  try {
    const meeting = await MeetingService.updateMeeting(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.status(201).json({ status: 200, data: { meeting } });
  } catch (err) {
    res.status(400).json({ status: "error", msg: err.message });
  }
};

//delete meeting
exports.deleteMeeting = async (req, res) => {
  try {
    await MeetingService.deleteMeeting(req.params.id, req.body);
    res
      .status(204)
      .json({ status: 200, msg: "Meeting successfully deleted" });
  } catch (err) {
    res.status(400).json({ status: "error", msg: err.message });
  }
};

//add meeting

exports.addMeeting = async (req, res, next) => {
  try {
    var meeting = await MeetingService.addMeeting(req.body, req.user);
    res
      .status(200)
      .json({ status: 200, data: { meeting }, message: "Succesfully added" });
  } catch (err) {
    res.status(400).json({ status: "adding meeting failed", msg: err.message });
  }
};
