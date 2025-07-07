import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
  const { fullname, email, phone, password, role } = req.body;
  if (!fullname || !email || !phone || !password || !role) {
    return res.status(400).json({
      msg: "Something is missing",
      success: false,
    });
  }

  try {
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        msg: "User already exists",
        success: false,
      });
    }

    const hashedpass = await bcrypt.hash(password, 10);
    let user = await User.create({
      fullname,
      password: hashedpass,
      email,
      phone,
      role,
    });

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phone: user.phone,
      profile: user.profile,
    };

    return res.status(200).json({
      msg: "User registered successfully",
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server error", success: false });
  }
};

export const login = async (req, res) => {
  const { email, password, role } = req.body;
  if (!email || !password || !role) {
    return res.status(400).json({
      msg: "Something is missing",
      success: false,
    });
  }

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        msg: "Incorrect email or password",
        success: false,
      });
    }

    const comparedpass = await bcrypt.compare(password, user.password);
    if (!comparedpass) {
      return res.status(400).json({
        msg: "Incorrect email or password",
        success: false,
      });
    }

    if (role !== user.role) {
      return res.status(400).json({
        msg: "Account does not exist with current role",
        success: false,
      });
    }

    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phone: user.phone,
      role: user.role,
      profile: user.profile,
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        msg: `Login Successfully ${user.fullname}`,
        success: true,
        user,
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server error", success: false });
  }
};

export const logout = (req, res) => {
  try {
    return res
      .status(200)
      .cookie("token", "", { maxAge: 0 })
      .json({
        msg: "Logged Out Successfully",
        success: true,
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server error", success: false });
  }
};

export const updateprofile = async (req, res) => {
  const file = req.file;
  const { fullname, email, phone, bio, skills } = req.body;

  try {
    const userId = req.id;
    let user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        msg: "User Not Found",
        success: false,
      });
    }

    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phone) user.phone = phone;
    if (bio) user.profile.bio = bio;

    if (skills) {
      const skillsArray = skills.split(",").map((skill) => skill.trim());
      user.profile.skills = skillsArray;
    }

    await user.save();

    const updatedUser = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phone: user.phone,
      role: user.role,
      profile: user.profile,
    };

    return res.status(200).json({
      msg: "Profile updated",
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    console.log("Update Profile Error:", error.message);
    return res.status(500).json({
      msg: "Server error",
      success: false,
    });
  }
};
