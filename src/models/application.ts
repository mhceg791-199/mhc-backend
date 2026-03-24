import mongoose, { Document, Schema } from "mongoose";

export interface IApplication extends Document {
  name: string;
  email: string;
  phone: string;
  position: string;
  experience: string;
  portfolio?: string;
  coverLetter: string;
  resumeUrl: string;
}

const applicationSchema = new Schema<IApplication>(
  {
    name: { type: String, required: true },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    phone: { type: String, required: true },

    position: { type: String, required: true },

    experience: { type: String, required: true },

    portfolio: String,

    coverLetter: { type: String, required: true },

    resumeUrl: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IApplication>(
  "Application",
  applicationSchema
);