import Application from "../models/application.model.js";
import { Job } from "../models/job.model.js";

// 📌 Apply for a job
export const applyJob = async (req, res) => {
  try {
    const userId = req.user._id;
    const { jobId } = req.params;

    if (!jobId) {
      return res.status(400).json({ msg: "No jobId provided", success: false });
    }

    // Already applied check
    const alreadyApplied = await Application.findOne({ job: jobId, applicants: userId });
    if (alreadyApplied) {
      return res.status(400).json({ msg: "Already applied for this job", success: false, applied: alreadyApplied });
    }

    // Check job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ msg: "Job not found", success: false });
    }

    // Create application
    const application = await Application.create({
      job: jobId,
      applicants: userId,
    });

    // Push to job.application array
    job.application.push(application._id);
    await job.save();

    return res.status(201).json({ msg: "Applied successfully", success: true, application });

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error", success: false });
  }
};

// 📌 Get all applied jobs for a user
export const allApliedJob = async (req, res) => {
  try {
    const userId = req.user._id;

    const applications = await Application.find({ applicants: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        populate: {
          path: "company"
        }
      });

    if (!applications.length) {
      return res.status(404).json({ msg: "No applications found", success: false });
    }

    return res.status(200).json({ applications, success: true });

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error", success: false });
  }
};

// 📌 Get all applicants for a job (admin)
export const getApplicants = async (req, res) => {
  try {
    const { jobId } = req.params;

    const job = await Job.findById(jobId).populate({
      path: "application",
      populate: {
        path: "applicants"
      },
      options: { sort: { createdAt: -1 } }
    });

    if (!job) {
      return res.status(404).json({ msg: "Job not found", success: false });
    }

    return res.status(200).json({ job, success: true });

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error", success: false });
  }
};

// 📌 Update application status
export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { id: applicationId } = req.params;

    if (!status) {
      return res.status(400).json({ msg: "Status is required", success: false });
    }

    const application = await Application.findById(applicationId);
    if (!application) {
      return res.status(404).json({ msg: "Application not found", success: false });
    }

    application.status = status.toLowerCase();
    await application.save();

    return res.status(200).json({ msg: "Status updated successfully", success: true });

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error", success: false });
  }
};
