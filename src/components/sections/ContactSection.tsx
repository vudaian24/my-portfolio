/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const ContactSchema = z.object({
  name: z.string().min(2, { message: "nameMin" }),
  email: z.string().email({ message: "emailInvalid" }),
  message: z.string().min(10, { message: "messageMin" }),
});

type ContactForm = z.infer<typeof ContactSchema>;

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
      className="min-h-screen flex items-center justify-center bg-background px-6 py-20"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="w-full max-w-3xl mx-auto bg-surface/5 backdrop-blur-md border border-border rounded-2xl p-8 md:p-12 shadow-xl"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-3 bg-linear-to-r from-cyan-400 via-blue-400 to-indigo-500 bg-clip-text text-transparent">
            {t("title")}
          </h2>
          <p className="text-muted-foreground text-base md:text-lg">
            {t("description")}
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-1">
            <label className="sr-only" htmlFor="name">
              {t("form.name")}
            </label>
            <input
              id="name"
              disabled={isSubmitting}
              {...register("name")}
              placeholder={t("form.name")}
              className={`w-full px-4 py-3 rounded-lg border bg-surface/20 transition-all duration-200 outline-none
                ${
                  errors.name
                    ? "border-destructive focus:ring-destructive/30"
                    : "border-border/60 focus:border-accent-teal focus:ring-2 focus:ring-accent-teal/20"
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              aria-invalid={!!errors.name}
            />
            {errors.name && (
              <p className="text-sm text-destructive font-medium ml-1">
                {tErrors(errors.name.message as any)}
              </p>
            )}
          </div>
          <div className="space-y-1">
            <label className="sr-only" htmlFor="email">
              {t("form.email")}
            </label>
            <input
              id="email"
              type="email"
              disabled={isSubmitting}
              {...register("email")}
              placeholder={t("form.email")}
              className={`w-full px-4 py-3 rounded-lg border bg-surface/20 transition-all duration-200 outline-none
                ${
                  errors.email
                    ? "border-destructive focus:ring-destructive/30"
                    : "border-border/60 focus:border-accent-teal focus:ring-2 focus:ring-accent-teal/20"
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              aria-invalid={!!errors.email}
            />
            {errors.email && (
              <p className="text-sm text-destructive font-medium ml-1">
                {tErrors(errors.email.message as any)}
              </p>
            )}
          </div>
          <div className="space-y-1">
            <label className="sr-only" htmlFor="message">
              {t("form.message")}
            </label>
            <textarea
              id="message"
              rows={5}
              disabled={isSubmitting}
              {...register("message")}
              placeholder={t("form.message")}
              className={`w-full px-4 py-3 rounded-lg border bg-surface/20 transition-all duration-200 outline-none resize-none
                ${
                  errors.message
                    ? "border-destructive focus:ring-destructive/30"
                    : "border-border/60 focus:border-accent-teal focus:ring-2 focus:ring-accent-teal/20"
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              aria-invalid={!!errors.message}
            />
            {errors.message && (
              <p className="text-sm text-destructive font-medium ml-1">
                {tErrors(errors.message.message as any)}
              </p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="relative w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 rounded-lg border border-accent-green text-accent-green font-semibold overflow-hidden group transition-all disabled:opacity-60 disabled:cursor-not-allowed hover:shadow-[0_0_20px_rgba(52,211,153,0.3)]"
            >
              <span className="absolute inset-0 bg-linear-to-r from-cyan-400 to-accent-teal -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>

              <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300">
                {isSubmitting ? (
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : null}
                {isSubmitting ? t("status.sending") : t("form.button")}
              </span>
            </button>

            <AnimatePresence mode="wait">
              {submitStatus === "success" && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2 text-green-500 font-medium"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  {t("status.success")}
                </motion.div>
              )}

              {submitStatus === "error" && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-red-500 font-medium"
                >
                  {t("status.error")}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <p className="text-xs text-muted-foreground mt-4 text-center sm:text-left opacity-70">
            {t("note")}
          </p>
        </form>
      </motion.div>
    </section>
  );
}
