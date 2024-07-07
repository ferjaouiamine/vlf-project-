const jwt = require("jsonwebtoken");

// Protect from non-logged user
exports.protect = async (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ msg: "Authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id;
    next();
  } catch (err) {
    console.log(err.message);
    res.status(401).json({ msg: err.message });
  }
};
