"use server";

import { validateContact, type ContactFields, type ContactState } from "@/lib/contact";

export async function sendEnquiry(_prev: ContactState, formData: FormData): Promise<ContactState> {
  // simple spam trap: real people never see or fill this field
  if (String(formData.get("website") ?? "")) return { status: "success", name: "" };

  const values: ContactFields = {
    name: String(formData.get("name") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    company: String(formData.get("company") ?? "").trim(),
    service: String(formData.get("service") ?? ""),
    description: String(formData.get("description") ?? "").trim(),
    budget: String(formData.get("budget") ?? ""),
  };

  const errors = validateContact(values);
  if (Object.keys(errors).length) {
    return { status: "error", message: "A few details need another look.", errors, values };
  }

  try {
    // ─────────────────────────────────────────────────────────────
    // TODO: send the enquiry. Nothing is delivered yet.
    // Suggested: Resend (resend.com) or Postmark, from a verified domain, e.g.
    //   await resend.emails.send({
    //     from: "ByteWright <site@bytewright.com>",
    //     to: "hello@bytewright.com",
    //     replyTo: values.email,
    //     subject: `New enquiry from ${values.name} (${values.service})`,
    //     text: JSON.stringify(values, null, 2),
    //   });
    // Keep the API key in an environment variable (RESEND_API_KEY) on Vercel.
    // ─────────────────────────────────────────────────────────────
    console.info("[contact] enquiry received (not sent yet, see TODO)", { ...values, description: `${values.description.length} chars` });
    return { status: "success", name: values.name.split(" ")[0] };
  } catch {
    return { status: "error", message: "Something went wrong on our side. Please email us instead.", values };
  }
}
