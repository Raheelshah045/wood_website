import { NextResponse } from "next/server";
import { z } from "zod";

// Zod schema for validating the incoming contact form submission.
const InquiryInputSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name is too long"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(6, "Phone number is too short").max(20, "Phone number is too long"),
  message: z.string().min(5, "Message must be at least 5 characters").max(1000, "Message is too long"),
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
 * Forward form submission to an external form submit service.
 */
async function forwardToFormService(data: InquiryInput, serviceUrl: string) {
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
      _subject: `New Wood Art Inquiry from ${data.name}`,
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
    const body = await request.json();

    // 1. Validate the form input
    const validation = validateInput(body);
    if (!validation.success) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    // 2. Determine target submit URL: priority to FORM_SUBMIT_URL env var, then fallback to Formspree
    const formSubmitUrl = process.env.FORM_SUBMIT_URL || "https://formspree.io/f/xwvznljw";

    // 3. Forward submission to the external form submit service
    const serviceResponse = await forwardToFormService(validation.data, formSubmitUrl);

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

