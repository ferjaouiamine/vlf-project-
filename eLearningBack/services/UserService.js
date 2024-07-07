var User = require("../models/User");
const { sendMail } = require("../services/SendEmailService");
const jwt = require("jsonwebtoken");
const moment = require("moment");
const { mail_new_user } = require("../template");
var fs = require("fs");

exports.addUser = async function (document, res) {
  try {
    // console.log(document.espace)
    var userfind = await User.find({
      firstName: document.firstName,
      lastName: document.lastName,
    });
    if (userfind.length != 0) {
      var user = await User.create({
        firstName: document.firstName,
        lastName: document.lastName,
        userName:
          document.firstName + "." + document.lastName + userfind.length,
        email: document.email,
        password: document.password,
        photo: document.photo,
        telephone: document.telephone,
        userDescription: document.userDescription,
        profession: document.profession,
        consultantVideo: document.consultantVideo,
        role: document.role,
      });
    } else {
      var user = await User.create({
        firstName: document.firstName,
        lastName: document.lastName,
        userName: document.firstName + "." + document.lastName,
        email: document.email,
        password: document.password,
        telephone: document.telephone,
        photo: document.photo,
        userDescription: document.userDescription,
        profession: document.profession,
        consultantVideo: document.consultantVideo,
        role: document.role,
      });
    }
    // var admin = await User.findOne({ role: "admin" });
    // var text = await mail_new_user(user.userName, user.password);
    // await sendMail(admin, "Nouvel utilisateur créé", text);
    return 200;
  } catch (error) {
    console.log("errrooor", error);
    throw Error(error);
  }
};

exports.addSubscriber = async (req, res, next) => {
  try {
    const { email } = req.body;
    await sendMail.addSubscriber(email);
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};

exports.signin = async function (document) {
  try {
    var user = await User.findOne({
      userName: document.userName,
    });
    if (!user) {
      throw Error("Username does not exist.");
    } else if (user.isBlocked) {
      throw Error("User is blocked. Please contact the administrator.");
    } else if (!user.authenticate(document.password)) {
      throw Error("Username and password do not match");
    }
    var token = jwt.sign(
      {
        id: user._id,
        firstname: user.firstName,
        lastname: user.lastName,
        role: user.role,
        userName: user.userName,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1800s",
      }
    );

    const refresh_token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET_REFRESH
    );
    User.updateOne(
      {
        _id: user._id,
      },
      {
        last_connection: moment().format(),
      }
    );
    return {
      token,
      refresh_token,
    };
  } catch (error) {
    console.log("error", error);
    throw Error(error);
  }
};

exports.getUser = async function () {
  try {
    var content = await User.find().select({
      firstName: 1,
      role: 1,
      _id: 1,
      lastName: 1,
      photo: 1,
      userDescription: 1,
      profession: 1,
      consultantVideo: 1,
      email: 1,
      telephone: 1,
      pgoto: 1,
      assignment: 1,
      userName: 1,
      isBlocked: 1,
      tokenDevice: 1,
    });
    //.select({ firstName: 1, _id: 1, lastName: 1, email: 1, telephone:1, assignment:1 });
    return content;
  } catch (e) {
    console.log(e);
    throw Error("Error while finding User");
  }
};

exports.updateUser = async function (id, newUser) {
  try {
    return await User.updateOne({ _id: id }, newUser);
  } catch (e) {
    console.log(e);
    throw Error("Error while updating User");
  }
};

exports.deleteUser = async function (id) {
  try {
    return await User.findByIdAndDelete(id);
  } catch (e) {
    console.log(e);
    throw Error("Error while deleting User");
  }
};

exports.getUserByID = async function (id) {
  try {
    var content = await User.findById(id).select({
      firstName: 1,
      role: 1,
      _id: 1,
      lastName: 1,
      photo: 1,
      userDescription: 1,
      profession: 1,
      consultantVideo: 1,
      email: 1,
      telephone: 1,
      pgoto: 1,
      assignment: 1,
      userName: 1,
    });
    //.select({ firstName: 1, _id: 1, lastName: 1, email: 1, telephone:1, assignment:1 });
    return content;
  } catch (e) {
    console.log(e);
    throw Error("Error while finding User");
  }
};
exports.removeAll = async function (usersList) {
  try {
    await User.remove({ _id: { $in: usersList.usersList } });
  } catch (error) {
    console.log(error);
    throw Error("Error while deleting Users");
  }
};

exports.getAllUsers = async function () {
  try {
    // return await User.findById('6447a61c587e34459f5f89b0');
    return await User.findOne({
      userName: "hamdiJaouadi",
    });
  } catch (e) {
    throw Error("Error while finding Users");
  }
};

exports.uploadMediaService = async function (req) {
  try {
    // console.log(req.body.id)
    var dir = "./uploads/" + req.body.name;
    let photos = [];
    console.log("====>body", req.body);

    var name = req.body.name;
    var img = req.body.image;

    if (!fs.existsSync(dir)) {
      fs.mkdir(dir, async (error) => {
        if (error) {
          console.log(error);
        } else {
          var realFile = Buffer.from(img, "base64");
          fs.writeFile(dir + "/" + name, realFile, function (err) {
            if (err) console.log(err);
          });
        }
      });
      return 201;
    }

    return 200;
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      message: e.message,
    });
  }
};
