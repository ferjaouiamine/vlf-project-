const express = require("express");
const router = express.Router();

var UserController = require("../controllers/UserController");
router.post("/newsletter", UserController.addSubscriber);
router.post("/add", UserController.addUser);
router.post("/signin", UserController.signin);
router.post("/register", UserController.register);
router.get("/getAll", UserController.fetchAllUsers);
router.get("/getUser/:id", UserController.getUserByID);
router.post("/update/:id", UserController.updateUser);
router.post("/delete/:id", UserController.deleteUser);
router.post("/removeAll", UserController.removeAll);
router.get("/", UserController.getAllUsers);
router.post("/updatemyprofile/:id", UserController.updateProfileController);
router.post("/refresh", UserController.refreshToken);
router.post("/uploadMedia", UserController.uploadMedia);

module.exports = router;
