import { NextResponse } from "next/server";
import { z } from "zod";
import crypto from "crypto";
import { connectToDatabase } from "@/lib/db";
import Inquiry from "@/models/Inquiry";

// Zod schema for validating the incoming contact form submission.
const InquiryInputSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name is too long"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(6, "Phone number is too short").max(20, "Phone number is too long"),
  message: z.string().min(5, "Message must be at least 5 characters").max(1000, "Message is too long"),
  projectType: z.enum(["residential", "commercial", "art_commission", "other"], {
    message: "Invalid project type selected",
  }),
  timeline: z.enum(["urgent", "3months", "flexible"], {
    message: "Invalid timeline selected",
  }),
});

type InquiryInput = z.infer<typeof InquiryInputSchema>;

/**
 * Validate incoming request payload.
 */
function validateInput(body: unknown): { success: true; data: InquiryInput } | { success: false; error: string } {
  const parseResult = InquiryInputSchema.safeParse(body);
  if (!parseResult.success) {
    const errorMsg = parseResult.error.issues.map((issue) => issue.message).join(", ");
    return { success: false, error: `Validation error: ${errorMsg}` };
  }
  return { success: true, data: parseResult.data };
}

/**
 * Securely stream file upload to Cloudinary using standard REST API with sha1 signature.
 */
async function uploadToCloudinary(file: File): Promise<string> {
  const cloudinaryUrlEnv = process.env.CLOUDINARY_URL;
  if (!cloudinaryUrlEnv) {
    console.warn("CLOUDINARY_URL is not configured. Skipping image upload.");
    return "";
  }

  // Parse CLOUDINARY_URL (format: cloudinary://api_key:api_secret@cloud_name)
  const matches = cloudinaryUrlEnv.match(/cloudinary:\/\/([^:]+):([^@]+)@(.+)/);
  if (!matches) {
    throw new Error("Invalid CLOUDINARY_URL format");
  }

  const [, apiKey, apiSecret, cloudName] = matches;
  const timestamp = Math.round(new Date().getTime() / 1000).toString();

  // Generate signature (hash of parameters sorted alphabetically plus api_secret)
  const signatureParams = `timestamp=${timestamp}${apiSecret}`;
  const signature = crypto
    .createHash("sha1")
    .update(signatureParams)
    .digest("hex");

  const formData = new FormData();
  formData.append("file", file);
  formData.append("api_key", apiKey);
  formData.append("timestamp", timestamp);
  formData.append("signature", signature);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Cloudinary upload failed: ${errorText}`);
  }

  const result = await response.json();
  return result.secure_url;
}

/**
 * Forward form submission to an external form submit service.
 */
async function forwardToFormService(
  data: InquiryInput,
  imageUrl: string,
  serviceUrl: string
) {
  const response = await fetch(serviceUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify({
      name: data.name,
      email: data.email,
      phone: data.phone,
      message: data.message,
      projectType: data.projectType,
      timeline: data.timeline,
      uploadedImageUrl: imageUrl || "No file uploaded",
      _subject: `New ${data.projectType.toUpperCase()} Inquiry from ${data.name}`,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `Form service responded with status ${response.status}`);
  }

  return response.json().catch(() => ({}));
}

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") || "";
    let data: unknown;
    let fileToUpload: File | null = null;

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      data = {
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        message: formData.get("message"),
        projectType: formData.get("projectType"),
        timeline: formData.get("timeline"),
      };
      const file = formData.get("file");
      if (file instanceof File && file.size > 0) {
        fileToUpload = file;
      }
    } else {
      data = await request.json();
    }

    // 1. Validate the form input
    const validation = validateInput(data);
    if (!validation.success) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    // 2. Upload file to Cloudinary if provided
    let imageUrl = "";
    if (fileToUpload) {
      imageUrl = await uploadToCloudinary(fileToUpload);
    }

    // 3. Save to MongoDB if configured
    if (process.env.MONGODB_URI) {
      try {
        await connectToDatabase();
        await Inquiry.create({
          name: validation.data.name,
          email: validation.data.email,
          phone: validation.data.phone,
          message: validation.data.message,
          projectType: validation.data.projectType,
          timeline: validation.data.timeline,
          imageUrl: imageUrl || undefined,
        });
      } catch (dbError) {
        console.error("Failed to save inquiry to MongoDB:", dbError);
      }
    }

    // 4. Determine target submit URL: priority to FORM_SUBMIT_URL env var, then fallback to Formspree
    const formSubmitUrl = process.env.FORM_SUBMIT_URL || "https://formspree.io/f/xwvznljw";

    // 5. Forward submission to the external form submit service
    const serviceResponse = await forwardToFormService(
      validation.data,
      imageUrl,
      formSubmitUrl
    );

    return NextResponse.json({
      success: true,
      message: "Your inquiry has been submitted successfully.",
      data: serviceResponse,
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "An unexpected server error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

