import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  requirements: [{ type: String }],
  salary: { type: Number, required: true },
  location: { type: String, required: true },
  jobType: { type: String, required: true },
  positions: { type: Number, required: true },
  experience: { type: String, required: true },
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  createdby: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  application: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Application' }] // ✅ FIX: make it an array
}, { timestamps: true });

export const Job = mongoose.model('Job', jobSchema);
