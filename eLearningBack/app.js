var express = require("express");
var path = require("path");
var app = express();
const _ = require("lodash");
const fileUpload = require("express-fileupload");

const mongoose = require("mongoose");
var createError = require("http-errors");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
var bodyParser = require("body-parser");


const UserRoute = require("./routes/UserRoute");
const MeetingRoute = require("./routes/MeetingRoute");

const server = require("http").createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

require("dotenv").config({
  path: path.join(__dirname, ".env"),
});

const uri = process.env.MONGODB_URI;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) =>
    console.log(`Connected successfully to DB : "${res.connections[0].name}"`)
  )
  .catch((err) => {
    console.log(`> Error while connecting to mongoDB : ${err.message}`);
  });

app.use(
  fileUpload({
    createParentPath: true,
  })
);
app.use("/uploads", express.static("uploads"));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.use(logger("dev"));
app.use(express.json({ limit: "50mb", extended: true }));
app.use(
  express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 })
);
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type: application/json"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.use("/user", UserRoute);
app.use("/meeting", MeetingRoute);

app.use(function (req, res, next) {
  next(createError(404));
});
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

const port = process.env.PORT || 5001;
app.listen(port, () => console.log(`listening on ${port}`));

//Websocket video
const PORTWS = 5000;

app.get("/", (req, res) => {
  res.send("Running");
});

io.on("connection", (socket) => {
  socket.emit("me", socket.id);

  socket.on("disconnect", () => {
    socket.broadcast.emit("callEnded");
  });

  socket.on("callUser", ({ userToCall, signalData, from, name }) => {
    io.to(userToCall).emit("callUser", { signal: signalData, from, name });
  });

  socket.on("answerCall", (data) => {
    io.to(data.to).emit("callAccepted", data.signal);
  });
});

server.listen(PORTWS, () =>
  console.log(`Websocket Server is running on port ${PORTWS}`)
);

module.exports = app;
