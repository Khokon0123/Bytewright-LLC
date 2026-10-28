import { serviceInterestOptions } from "./services";

export { serviceInterestOptions };

/** Budget ranges are the client's, not our prices. Pricing is always discussed after a call. */
export const budgetOptions = [
  { value: "under-10k", label: "Under $10k" },
  { value: "10k-25k", label: "$10k – $25k" },
  { value: "25k-50k", label: "$25k – $50k" },
  { value: "50k-plus", label: "$50k+" },
  { value: "not-sure", label: "Not sure yet" },
];

export type ContactFields = {
  name: string;
  email: string;
  company: string;
  service: string;
  description: string;
  budget: string;
};
export type FieldErrors = Partial<Record<keyof ContactFields, string>>;

export type ContactState =
  | { status: "idle" }
  | { status: "success"; name: string }
  | { status: "error"; message: string; errors?: FieldErrors; values?: Partial<ContactFields> };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Shared by the browser (instant feedback) and the server action (never trust the client). */
export function validateContact(v: Partial<ContactFields>): FieldErrors {
  const e: FieldErrors = {};
  if (!v.name?.trim()) e.name = "Please tell us your name.";
  if (!v.email?.trim()) e.email = "We need an email to reply to.";
  else if (!EMAIL.test(v.email.trim())) e.email = "That email doesn’t look quite right.";
  if (!v.service || !serviceInterestOptions.some((o) => o.value === v.service)) e.service = "Pick the closest option. ‘Not sure yet’ is fine.";
  const d = v.description?.trim() ?? "";
  if (d.length < 20) e.description = d ? "A little more detail helps (20 characters or more)." : "A sentence or two about the project, please.";
  if (v.budget && !budgetOptions.some((o) => o.value === v.budget)) e.budget = "Please choose a budget range.";
  return e;
}
