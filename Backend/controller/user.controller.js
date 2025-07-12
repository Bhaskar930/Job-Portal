import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { Job } from "../models/job.model.js";
import getDataUri from "../utils/dataUri.js";
import cloudinary from "../utils/cloudinary.js";

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
  try {
    const { fullname, email, phone, bio, skills } = req.body;
    const file = req.file;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ msg: "User not found", success: false });
    }

    // Update basic fields
    user.fullname = fullname;
    user.email = email;
    user.phone = phone;
    user.profile.bio = bio;
    user.profile.skills = JSON.parse(skills);

    // ✅ If file is uploaded, upload to Cloudinary (as raw type)
    if (file) {
      const fileUri = getDataUri(file);

      const myCloud = await cloudinary.uploader.upload(fileUri.content, {
        resource_type: "raw", // Important for PDF
        folder: "resumes",
        use_filename: true,
        unique_filename: false,
      });

      // ✅ Generate inline previewable URL
      user.profile.resume = myCloud.secure_url.replace(
        "/upload/",
        "/upload/fl_attachment:false/fl_inline:true/"
      );
      user.profile.resumeOrignalName = file.originalname;
    }

    await user.save();

    return res.status(200).json({
      success: true,
      msg: "Profile updated successfully",
      user,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    return res.status(500).json({ msg: "Something went wrong", success: false });
  }
};
