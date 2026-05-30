import mongoose, { Schema, Document, Model } from "mongoose";

export interface IInquiry extends Document {
  name: string;
  email: string;
  phone: string;
  message: string;
  projectType: string;
  timeline: string;
  imageUrl?: string;
  createdAt: Date;
}

const InquirySchema: Schema<IInquiry> = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
    },
    projectType: {
      type: String,
      required: [true, "Project type is required"],
      enum: ["residential", "commercial", "art_commission", "other"],
    },
    timeline: {
      type: String,
      required: [true, "Timeline is required"],
      enum: ["urgent", "3months", "flexible"],
    },
    imageUrl: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent redefinition of the model during hot-reloading
const Inquiry: Model<IInquiry> =
  mongoose.models.Inquiry || mongoose.model<IInquiry>("Inquiry", InquirySchema);

export default Inquiry;
