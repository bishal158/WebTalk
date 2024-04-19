const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "mentor-mind";
const filesystem = require("fs");


const register = async (req, res, next) => {
    // file handle
    console.log(req.file)
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const extension = parts[parts.length - 1];
    const newPath = path + "." + extension;
    filesystem.renameSync(path, newPath);
    // destructure data
    const { name, email, password } = req.body;

    // password hash
    const hasPassword = await bcrypt.hashSync(password, 10);
    // check for existing user
    let existingUser;
    try {
        existingUser = await User.findOne({ email: email });
        if (existingUser) {
            res.status(409).json({ message: " Email already registered" });
        } else {
            const admin = await User.create({
                name,
                email,
                avatar: newPath,
                password: hasPassword,
            });
            res.status(201).json({ message: "Registration Successful" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.register = register;