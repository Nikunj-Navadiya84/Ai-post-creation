const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Signup user
exports.signup = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error registering user" });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    const token = jwt.sign(
      { id: user._id, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "90d" }
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Login failed" });
  }
};

// Fetch users
exports.users = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("name email");

    return res.status(200).send({
      success: true,
      message: "Users successfully fetched",
      userId: user._id,
      email: req.user.email,
      LoginUserName: req.user.name
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: err.message
    });
  }
};

// Change password
exports.changepassword = async (req, res) => {
  try {
    const { email, oldPassword, newPassword, confirmPassword } = req.body;

    let checkUser = await User.findOne({ email: email });
    if (!checkUser) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    const passwordMatch = await bcrypt.compare(oldPassword, checkUser.password);
    if (!passwordMatch) {
      return res.status(400).send({
        success: false,
        message: "Old password is incorrect",
      });
    }

    if (oldPassword === newPassword) {
      return res.status(400).send({
        success: false,
        message: "New password cannot be the same as old password",
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).send({
        success: false,
        message: "New password and confirm password do not match",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const updatedUser = await User.findByIdAndUpdate(
      checkUser._id,
      { $set: { password: hashedPassword } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(500).send({
        success: false,
        message: "Error updating password",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};
