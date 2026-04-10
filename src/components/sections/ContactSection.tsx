/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";

const ContactSchema = z.object({
  name: z.string().min(2, { message: "nameMin" }),
  email: z.string().email({ message: "emailInvalid" }),
  message: z.string().min(10, { message: "messageMin" }),
});

type ContactForm = z.infer<typeof ContactSchema>;

const inputClass =
  "w-full rounded-lg border bg-background/80 px-4 py-3 text-sm text-foreground transition-[border-color,box-shadow] outline-none placeholder:text-text-muted focus-visible:ring-2 focus-visible:ring-brand/25 disabled:cursor-not-allowed disabled:opacity-50";

export default function ContactSection() {
  const t = useTranslations("HomePage.ContactSection");
  const tErrors = useTranslations("HomePage.ContactSection.errors");
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactForm>({
    resolver: zodResolver(ContactSchema),
    mode: "onTouched",
  });

  const onSubmit = async (data: ContactForm) => {
    setSubmitStatus("idle");

    try {
      const res = await fetch("/web-api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Failed to send message");
      }
      setSubmitStatus("success");
      reset();
      setTimeout(() => {
        setSubmitStatus("idle");
      }, 5000);
    } catch (err) {
      console.error("Contact submit error:", err);
      setSubmitStatus("error");
    }
  };

  return (
    <section
      id="contact"
      className="scroll-mt-24 border-t border-border/60 py-20 md:py-28"
    >
      <div className="section-shell max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <p className="section-label mb-3">{t("eyebrow")}</p>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            {t("title")}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground">
            {t("description")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 rounded-2xl border border-border bg-surface-elevated/50 p-6 shadow-sm backdrop-blur-sm md:p-10"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="block text-left text-xs font-medium uppercase tracking-wider text-text-secondary"
              >
                {t("form.name")}
              </label>
              <input
                id="name"
                disabled={isSubmitting}
                {...register("name")}
                placeholder={t("form.name")}
                className={`${inputClass} ${
                  errors.name
                    ? "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20"
                    : "border-border focus-visible:border-brand/50"
                }`}
                aria-invalid={!!errors.name}
                autoComplete="name"
              />
              {errors.name && (
                <p className="text-left text-sm text-destructive">
                  {tErrors(errors.name.message as any)}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-left text-xs font-medium uppercase tracking-wider text-text-secondary"
              >
                {t("form.email")}
              </label>
              <input
                id="email"
                type="email"
                disabled={isSubmitting}
                {...register("email")}
                placeholder={t("form.email")}
                className={`${inputClass} ${
                  errors.email
                    ? "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20"
                    : "border-border focus-visible:border-brand/50"
                }`}
                aria-invalid={!!errors.email}
                autoComplete="email"
              />
              {errors.email && (
                <p className="text-left text-sm text-destructive">
                  {tErrors(errors.email.message as any)}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="message"
                className="block text-left text-xs font-medium uppercase tracking-wider text-text-secondary"
              >
                {t("form.message")}
              </label>
              <textarea
                id="message"
                rows={5}
                disabled={isSubmitting}
                {...register("message")}
                placeholder={t("form.message")}
                className={`${inputClass} resize-none ${
                  errors.message
                    ? "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20"
                    : "border-border focus-visible:border-brand/50"
                }`}
                aria-invalid={!!errors.message}
              />
              {errors.message && (
                <p className="text-left text-sm text-destructive">
                  {tErrors(errors.message.message as any)}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="submit"
                disabled={isSubmitting}
                className="font-display inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-brand px-8 text-sm font-semibold text-brand-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
              >
                {isSubmitting ? (
                  <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                ) : (
                  <Send className="h-4 w-4" strokeWidth={2} aria-hidden />
                )}
                {isSubmitting ? t("status.sending") : t("form.button")}
              </button>

              <AnimatePresence mode="wait">
                {submitStatus === "success" && (
                  <motion.div
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center justify-center gap-2 text-sm font-medium text-accent-green sm:justify-end"
                  >
                    <CheckCircle2 className="h-5 w-5 shrink-0" aria-hidden />
                    {t("status.success")}
                  </motion.div>
                )}
                {submitStatus === "error" && (
                  <motion.div
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center justify-center gap-2 text-sm font-medium text-destructive sm:justify-end"
                  >
                    <AlertCircle className="h-5 w-5 shrink-0" aria-hidden />
                    {t("status.error")}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <p className="text-center text-xs text-text-muted sm:text-left">
              {t("note")}
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
