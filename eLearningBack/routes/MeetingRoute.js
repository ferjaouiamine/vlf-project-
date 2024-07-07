const express = require("express");
const router = express.Router();
var MeetingController = require("../controllers/MeetingController");
// var authController = require("../controllers/AuthenticationController");

//router.use(authController.protect);

router.get("/", MeetingController.getAllMeetings);
router.get("/:id", MeetingController.getMeeting);
router.post("/update/:id", MeetingController.updateMeeting);
router.post("/delete/:id", MeetingController.deleteMeeting);
router.post("/add", MeetingController.addMeeting);

module.exports = router;