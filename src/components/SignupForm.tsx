"use client";

import { useState } from "react";
import { toast } from "sonner";
import { signupFormSchema } from "@/lib/validators";

interface SignupFormProps {
  mentorId: string;
  mentorName: string;
  slotsRemaining: number;
}

export function SignupForm({
  mentorId,
  mentorName,
  slotsRemaining,
}: SignupFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (slotsRemaining <= 0) {
    return (
      <div className="border border-gold-trace p-8 text-center">
        <p className="text-gold-dark italic">
          All slots for {mentorName} are currently filled. Check back later.
        </p>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="border border-gold-dim p-8 text-center">
        <h3 className="text-xl text-gold-light italic mb-2">
          Registration Successful
        </h3>
        <p className="text-gold-mid opacity-80 italic">
          You&apos;ve signed up for mentorship with {mentorName}. We&apos;ll be
          in touch soon.
        </p>
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      mentorId,
      alias: ((formData.get("alias") as string) || "").trim().toLowerCase(),
    };

    const parsed = signupFormSchema.safeParse(data);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const field = issue.path[0] as string;
        fieldErrors[field] = issue.message;
      }
      setErrors(fieldErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      if (!res.ok) {
        const body = await res.json();
        toast.error(body.error || "Registration failed. Please try again.");
        setIsSubmitting(false);
        return;
      }

      setSubmitted(true);
      toast.success("Successfully registered!");
    } catch {
      toast.error("Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <div className="flex-1">
        <div className="flex items-center border border-gold-trace focus-within:border-gold-mid transition-colors duration-300">
          <input
            id="alias"
            name="alias"
            placeholder="alias"
            required
            autoComplete="off"
            className="w-full bg-transparent px-4 py-3 text-gold-light placeholder:text-gold-dark/50 focus:outline-none"
          />
          <span className="pr-4 text-gold-dark text-[0.85rem] italic select-none">
            @microsoft.com
          </span>
        </div>
        {errors.alias && (
          <p className="text-[0.8rem] text-[#c4795a] mt-1 italic">
            {errors.alias}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-transparent border border-gold-dark text-gold-mid px-6 py-3 text-[0.9rem] uppercase tracking-[0.2em] cursor-pointer transition-all duration-400 hover:bg-gold-mid hover:text-bg-base hover:border-gold-mid disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap"
      >
        {isSubmitting ? "..." : "Sign Up"}
      </button>
    </form>
  );
}
