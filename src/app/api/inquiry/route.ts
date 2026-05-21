import { NextResponse } from "next/server";
import { z } from "zod";
import { connectToDatabase } from "@/lib/db";
import Inquiry from "@/models/Inquiry";

// Define input validation schema
const InquiryInputSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name is too long"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(6, "Phone number is too short").max(20, "Phone number is too long"),
  message: z.string().min(5, "Message must be at least 5 characters").max(1000, "Message is too long"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate body shape and content with Zod schema
    const parseResult = InquiryInputSchema.safeParse(body);
    if (!parseResult.success) {
      const errorMsg = parseResult.error.issues.map((issue) => issue.message).join(", ");
      return NextResponse.json(
        { error: `Validation error: ${errorMsg}` },
        { status: 400 }
      );
    }

    const { name, email, phone, message } = parseResult.data;

    // Connect to database
    await connectToDatabase();

    // Create database entry
    const newInquiry = await Inquiry.create({
      name,
      email,
      phone,
      message,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Inquiry saved successfully",
        data: {
          id: newInquiry._id,
          name: newInquiry.name,
          email: newInquiry.email,
        },
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "An unexpected server error occurred";
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
