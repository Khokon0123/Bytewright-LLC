"use client";

import { useActionState, useRef, useState, type FormEvent } from "react";
import { sendEnquiry } from "./actions";
import {
  budgetOptions,
  serviceInterestOptions,
  validateContact,
  type ContactFields,
  type ContactState,
  type FieldErrors,
} from "@/lib/contact";
import { site } from "@/lib/site";

const initial: ContactState = { status: "idle" };

const field =
  "block w-full min-h-12 border-0 border-b border-line-strong bg-transparent px-0 py-3 text-lead text-fg placeholder:text-faint transition-colors duration-200 hover:border-fg/40 focus:border-accent focus:outline-none focus-visible:outline-none aria-[invalid=true]:border-[#e5484d]";

function Field({
  id,
  label,
  optional,
  error,
  hint,
  children,
}: {
  id: keyof ContactFields;
  label: string;
  optional?: boolean;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="label flex justify-between gap-4">
        <span>{label}</span>
        {optional && <span className="text-faint">Optional</span>}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-2 text-small text-muted">
          {hint}
        </p>
      )}
      <p id={`${id}-error`} className="mt-2 min-h-[1.55em] text-small text-[#e5484d] light:text-[#c22d32]" aria-live="polite">
        {error}
      </p>
    </div>
  );
}

export function ContactForm() {
  const [state, action, pending] = useActionState(sendEnquiry, initial);
  const [clientErrors, setClientErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const serverErrors = state.status === "error" ? state.errors ?? {} : {};
  const errors: FieldErrors = { ...serverErrors, ...clientErrors };
  const values = state.status === "error" ? state.values ?? {} : {};

  function read(form: HTMLFormElement): Partial<ContactFields> {
    const f = new FormData(form);
    return Object.fromEntries(["name", "email", "company", "service", "description", "budget"].map((k) => [k, String(f.get(k) ?? "")]));
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    setTouched(true);
    const found = validateContact(read(e.currentTarget));
    setClientErrors(found);
    if (Object.keys(found).length) {
      e.preventDefault();
      // move focus to the first problem so keyboard and screen-reader users land on it
      const first = Object.keys(found)[0];
      e.currentTarget.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
    }
  }

  // re-validate as people fix things, but only after the first submit attempt
  function onChange() {
    if (touched && formRef.current) setClientErrors(validateContact(read(formRef.current)));
  }

  if (state.status === "success") {
    return (
      <div role="status">
        <p className="label font-medium text-accent-ink">Message received</p>
        <p className="mt-6 text-h2">
          Thanks{state.name ? `, ${state.name}` : ""}. We’ll reply within 24 hours.
        </p>
        <p className="mt-6 max-w-[48ch] text-muted">
          Keep an eye on your inbox (and the spam folder, just in case). If it’s urgent, email{" "}
          <a href={`mailto:${site.email}`} className="tap link text-fg">
            {site.email}
          </a>
          .
        </p>
      </div>
    );
  }

  const describe = (id: keyof ContactFields, hint?: boolean) =>
    errors[id] ? `${id}-error` : hint ? `${id}-hint` : undefined;

  return (
    <form ref={formRef} action={action} onSubmit={onSubmit} onChange={onChange} noValidate className="space-y-4" aria-describedby="form-status">
      {state.status === "error" && (
        <div id="form-status" role="alert" className="border-l-2 border-[#e5484d] py-1 pl-4 text-small">
          {state.message}{" "}
          {!state.errors && (
            <a href={`mailto:${site.email}`} className="tap link underline">
              {site.email}
            </a>
          )}
        </div>
      )}

      <div className="grid gap-x-[var(--spacing-grid)] gap-y-4 md:grid-cols-2">
        <Field id="name" label="Your name" error={errors.name}>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            autoCapitalize="words"
            enterKeyHint="next"
            required
            defaultValue={values.name}
            aria-invalid={!!errors.name}
            aria-describedby={describe("name")}
            className={field}
          />
        </Field>
        <Field id="email" label="Email" error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            enterKeyHint="next"
            required
            defaultValue={values.email}
            aria-invalid={!!errors.email}
            aria-describedby={describe("email")}
            className={field}
          />
        </Field>
      </div>

      <Field id="company" label="Company or organization" optional error={errors.company}>
        <input
          id="company"
          name="company"
          type="text"
          autoComplete="organization"
          enterKeyHint="next"
          defaultValue={values.company}
          className={field}
        />
      </Field>

      <div className="grid gap-x-[var(--spacing-grid)] gap-y-4 md:grid-cols-2">
        <Field id="service" label="What do you need?" error={errors.service}>
          <div className="relative">
            <select
              id="service"
              name="service"
              required
              defaultValue={values.service ?? ""}
              aria-invalid={!!errors.service}
              aria-describedby={describe("service")}
              className={`${field} appearance-none pr-8`}
            >
              <option value="" disabled>
                Choose one
              </option>
              {serviceInterestOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            <span aria-hidden="true" className="pointer-events-none absolute top-1/2 right-0 -translate-y-1/2 text-muted">
              ↓
            </span>
          </div>
        </Field>
        <Field id="budget" label="Budget range" optional error={errors.budget}>
          <div className="relative">
            <select
              id="budget"
              name="budget"
              defaultValue={values.budget ?? ""}
              aria-invalid={!!errors.budget}
              aria-describedby={describe("budget")}
              className={`${field} appearance-none pr-8`}
            >
              <option value="">Choose a range</option>
              {budgetOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            <span aria-hidden="true" className="pointer-events-none absolute top-1/2 right-0 -translate-y-1/2 text-muted">
              ↓
            </span>
          </div>
        </Field>
      </div>

      <Field id="description" label="About the project" error={errors.description} hint="What are you building, who is it for, and is there a date that matters?">
        <textarea
          id="description"
          name="description"
          rows={5}
          required
          enterKeyHint="enter"
          defaultValue={values.description}
          aria-invalid={!!errors.description}
          aria-describedby={describe("description", true)}
          className={`${field} resize-y`}
        />
      </Field>

      {/* honeypot — hidden from people and assistive tech */}
      <div aria-hidden="true" className="sr-only">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col items-start gap-5 pt-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={pending}
          className="group inline-flex h-12 min-w-44 items-center justify-center gap-3 rounded-full bg-accent px-6 font-medium whitespace-nowrap text-on-accent transition-[transform,background-color,opacity] duration-300 ease-out-expo hover:bg-[#6a9ff8] active:scale-[0.98] disabled:cursor-wait disabled:opacity-70"
        >
          {pending ? "Sending…" : "Send enquiry"}
          {!pending && (
            <span aria-hidden="true" className="transition-transform duration-500 ease-out-expo group-hover:translate-x-1">
              →
            </span>
          )}
        </button>
        <p className="text-small text-muted">We reply within 24 hours.</p>
      </div>
    </form>
  );
}
