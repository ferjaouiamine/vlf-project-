var UserService = require("../services/UserService");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const sendEmail = require("../services/SendEmailService");

exports.addUser = async function (req, res) {
  try {
    var result = await UserService.addUser(req.body);
    return res.status(200).json({
      status: 200,
      data: result,
      message: "Succesfully User added",
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};

exports.signin = async (req, res) => {
  try {
    var result = await UserService.signin(req.body);
    return res.status(200).json({
      status: 200,
      data: result,
      message: "Succesfully User logged",
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};

exports.fetchAllUsers = async function (req, res) {
  try {
    var result = await UserService.getUser();
    return res.status(200).json({
      status: 200,
      data: result,
      message: "Succesfully Users getted",
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};

exports.getUserByID = async function (req, res) {
  try {
    console.log("req", req);
    var result = await UserService.getUserByID(req.params.id);
    return res.status(200).json({
      status: 200,
      data: result,
      message: "Succesfully User getted",
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};
exports.getEspaceUser = async function (req, res) {
  try {
    var result = await UserService.getEspaceUser(req.params.id);
    return res.status(200).json({
      status: 200,
      data: result,
      message: "Succesfully espace getted",
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};

exports.addSubscriber = async (req, res, next) => {
  try {
    const { email } = req.body;
    await sendEmail.addSubscriber(email);
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};

exports.updateUser = async function (req, res) {
  try {
    var result = await UserService.updateUser(req.params.id, req.body);
    return res.status(200).json({
      status: 200,
      data: result,
      message: "Succesfully User updated",
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};

exports.deleteUser = async function (req, res) {
  try {
    var result = await UserService.deleteUser(req.params.id);
    return res.status(200).json({
      status: 200,
      data: result,
      message: "Succesfully User deleted",
    });
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};

exports.removeAll = async function (req, res) {
  try {
    var result = await UserService.removeAll(req.body);
    return res.status(200).json({
      status: 200,
      data: result,
      message: "Succesfully Users deleted",
    });
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await UserService.getAllUsers();
    res.status(200).json({ status: "success", data: { users } });
  } catch (err) {
    res.status(400).json({ status: "error", msg: err.message });
  }
};

exports.updateProfileController = (req, res) => {
  User.findOne({ _id: req.params.id }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }

    if (req.body.newpassword) {
      var regularExpression =
        /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
      if (req.body.newpassword.length < 6) {
        return res.status(200).json({
          status: 201,
          message: "Password must be at least 6 characters",
        });
      } else if (!regularExpression.test(req.body.newpassword)) {
        return res.status(200).json({
          status: 201,
          message:
            "Password should contain at least one number and one special character",
        });
      } else {
        if (!user.authenticate(req.body.oldpassword)) {
          return res.status(200).json({
            status: 201,
            message: "Old password is incorrect",
          });
        } else {
          user.password = req.body.newpassword;
        }
      }
    }

    if (req.file) {
      user.photo = req.file.filename;
    }

    user.save((err, updatedUser) => {
      if (err) {
        console.log("USER UPDATE ERROR", err);
        return res.status(200).json({
          status: 201,
          message: "User update failed",
        });
      }

      updatedUser.hashed_password = undefined;
      updatedUser.salt = undefined;

      if (req.body.newpassword) {
        return res.status(200).json({
          status: 200,
          message: "Password has been changed successfully",
        });
      } else {
        return res.json({
          status: 200,
          message: "User profile updated successfully",
        });
      }
    });
  });
};

exports.refreshToken = async (req, res) => {
  const refresh_token = req.body.refreshToken;
  if (!refresh_token) {
    res.status(401).json({
      errors: "Token not found",
    });
  }
  try {
    const verifToken = await jwt.verify(
      refresh_token,
      process.env.JWT_SECRET_REFRESH
    );
    const id = verifToken.id;
    var user = await User.findById(id);
    if (!user) {
      return res.status(400).json({
        errors: "User not found.",
      });
    } else {
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
    }

    return res.json({
      token,
    });
  } catch (e) {
    console.log(e);
    return res.status(400).json({
      error: e.toString(),
    });
  }
};

exports.register = async (req, res) => {
  console.log("****req", req);
  const { firstName, lastName, email, userName, password, role } = req.body;

  let user = await User.findOne({ email });
  try {
    if (user) {
      return res
        .status(400)
        .json({ status: "error", msg: "User already exists" });
    }
    user = await User.create({
      firstName,
      lastName,
      email,
      userName,
      password,
      role,
    });
    const token = jwt.sign(
      {
        id: user._id,
        firstname: user.firstName,
        lastname: user.lastName,
        role: user.role,
        userName: user.userName,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: 3600,
      }
    );
    res.status(201).json({ status: "success", data: { user, token } });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ status: "error", msg: err.message });
  }
};

exports.uploadMedia = async function (req, res) {
  console.log("====>req", req);
  try {
    var result = await UserService.uploadMediaService(req);
    if (result == 201)
      return res.status(201).json({
        status: 201,
        data: "media uploaded",
        message: "media uploaded",
      });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message,
    });
  }
};
