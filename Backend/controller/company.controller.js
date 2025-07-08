import { Company } from "../models/company.model.js";

// Register a new company
export const registercompany = async (req, res) => {
  try {
    const { companyName } = req.body;

    if (!companyName) {
      return res.status(400).json({
        msg: "Company name is required",
        success: false,
      });
    }

    const existingCompany = await Company.findOne({ name: companyName });
    if (existingCompany) {
      return res.status(400).json({
        msg: "You can't register the same company again",
        success: false,
      });
    }

    const company = await Company.create({
      name: companyName,
      userId: req.user._id, // ✅ Fix: correctly accessing user ID from auth middleware
    });

    return res.status(201).json({
      msg: "Company added successfully",
      company,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Server error", success: false });
  }
};

// Get all companies registered by the current user
export const getCompany = async (req, res) => {
  try {
    const userId = req.user._id;
    const companies = await Company.findOne({ userId });

    if (!companies || companies.length === 0) {
      return res.status(404).json({
        msg: "No companies found",
        success: false,
      });
    }

    return res.status(200).json({ companies, success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Server error", success: false });
  }
};

// Get a company by its ID
export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId); // ✅ Fix: proper method usage

    if (!company) {
      return res.status(404).json({
        msg: "Company not found",
        success: false,
      });
    }

    return res.status(200).json({
      company,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Server error", success: false });
  }
};

// Update company details
export const updateCompany = async (req, res) => {
  try {
    const { name, website, description, location } = req.body;
    const file = req.file;

    // Dynamically build updateData only with provided fields
    const updateData = {};

    if (name) updateData.name = name;
    if (website) updateData.website = website;
    if (description) updateData.description = description;
    if (location) updateData.location = location;
    if (file) updateData.logo = file.path; // Or Cloudinary URL

    // Make sure at least one field is being updated
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        msg: "No valid fields provided for update",
        success: false,
      });
    }

    const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!company) {
      return res.status(404).json({
        msg: "Company not found",
        success: false,
      });
    }

    return res.status(200).json({
      msg: "Company data updated",
      company,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Server error", success: false });
  }
};
