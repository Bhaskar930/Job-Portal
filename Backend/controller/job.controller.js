import { Job } from "../models/job.model.js";

// 🧑‍💼 Admin posts a job
export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experience,
      positions,
      companyId,
    } = req.body;

    const userId = req.user._id;

    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !jobType ||
      !experience ||
      !positions ||
      !companyId
    ) {
      return res.status(400).json({
        message: "Something is missing.",
        success: false,
      });
    }

    const job = await Job.create({
      title,
      description,
      requirements: requirements.split(","),
      salary: Number(salary),
      location,
      jobType,
      experience,
      positions:Number(positions),
      company: companyId,
      createdby: userId,
    });

    return res.status(201).json({
      message: "New job created successfully.",
      job,
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Server Error",
      success: false,
    });
  }
};

// 🔍 Get all jobs (with optional keyword search)
export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };

    const jobs = await Job.find(query).populate({
        path:"company"
    }).sort({cretedAt:-1});

    if (!jobs || jobs.length === 0) {
      return res.status(404).json({
        msg: "Job not found",
        success: false,
      });
    }

    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Server Error",
      success: false,
    });
  }
};

// 📄 Get job by ID
export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;

    const job = await Job.findById(jobId); // ✅ Fix: incorrect object used before

    if (!job) {
      return res.status(404).json({
        msg: "No job found",
        success: false,
      });
    }

    return res.status(200).json({
      msg: "Job found",
      job,
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Server Error",
      success: false,
    });
  }
};

// 🧑‍💼 Get all jobs created by the current admin
export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.user._id;

    const jobs = await Job.find({ createdby: adminId }); // ✅ Fix: field name should match `created_by`

    if (!jobs || jobs.length === 0) {
      return res.status(404).json({
        msg: "No jobs created",
        success: false,
      });
    }

    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Server Error",
      success: false,
    });
  }
};
