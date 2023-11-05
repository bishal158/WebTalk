const express = require("express");
const mongoose = require("mongoose");
const { PORT, MONGODB_CONNECTION } = require("../server/config");
const cors = require("cors");
const app = express();
// api routes
const UserRoutes = require("./routes/User-Routes");
// models
const User = require("./models/User");
// app use
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);
app.use(express.json());
// middleware
app.use("/register", UserRoutes);
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
