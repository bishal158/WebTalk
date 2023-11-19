const express = require("express");
const mongoose = require("mongoose");
const { PORT, MONGODB_CONNECTION } = require("../server/config");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
// api routes
const UserRoutes = require("./routes/User-Routes");
// models
const User = require("./models/User");
// app use
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));
// middleware
app.use("/user", UserRoutes);

// database connection
mongoose
  .connect(MONGODB_CONNECTION)
  .then(() => {
    console.log("Connected to Database");
    app.listen(PORT, () => {
      console.log(`listening on ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(error);
  });
