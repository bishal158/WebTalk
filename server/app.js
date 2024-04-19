const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const path = require("path");
const cors = require("cors");
const app = express();
dotenv.config();

// port number
const PORT = process.env.PORT;
const DATABASE_URL = process.env.MONGODB_CONNECTION;
// database connection
const connectDb = async () => {
    try {
        await mongoose.connect(DATABASE_URL);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};
connectDb().then((r) => console.log("Connected to Database"));
app.use(cookieParser());
app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
// set static folder
app.use("/uploads", express.static(__dirname + "/uploads"));
// routes
const userRouter = require("./routes/userRoutes");
app.use("/user", userRouter);
app.listen(PORT);


// database password : ubpzJKU8kj99EUx8
// connection string : mongodb+srv://afnanmafuj22:ubpzJKU8kj99EUx8@cluster0.kgnmq78.mongodb.net