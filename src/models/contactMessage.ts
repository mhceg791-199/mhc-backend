import mongoose, { Document, Schema } from "mongoose";

export interface IContactMessage extends Document {
  name: string;
  email: string;
  message: string;
  site?: {
    name?: string;
    url?: string;
  };
  createdAt: Date;
}

const contactSchema = new Schema<IContactMessage>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
    },
    site: {
      name: String,
      url: String,
    },
    
  },
  { timestamps: true }
);

export default mongoose.model<IContactMessage>(
  "ContactMessage",
  contactSchema
);