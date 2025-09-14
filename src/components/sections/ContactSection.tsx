"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const ContactSchema = z.object({
  name: z.string().min(3, { message: "nameMin" }),
  email: z.string().email({ message: "emailInvalid" }),
  message: z.string().min(10, { message: "messageMin" }),
});

type ContactForm = z.infer<typeof ContactSchema>;

export default function ContactSection() {
  const t = useTranslations("HomePage.ContactSection");
  const tErrors = useTranslations("HomePage.ContactSection.errors");

  const [status, setStatus] = useState<
    null | "idle" | "sending" | "success" | "error"
  >(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactForm>({
    resolver: zodResolver(ContactSchema),
    mode: "onTouched",
    defaultValues: { name: "", email: "", message: "" },
  });

  const onSubmit = async (data: ContactForm) => {
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Network error");
      }

      setStatus("success");
      reset();
    } catch (err) {
      setStatus("error");
      console.error("Contact submit error:", err);
    } finally {
      // đảm bảo isSubmitting dùng bởi react-hook-form
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
        viewport={{ once: false, amount: 0.25 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-3xl mx-auto bg-surface/5 backdrop-blur-md border border-border rounded-2xl p-8 md:p-12 shadow-xl"
      >
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-2 bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500 bg-clip-text text-transparent">
            {t("title")}
          </h2>
          <p className="text-muted-foreground text-base md:text-lg">
            {t("description")}
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="sr-only" htmlFor="name">
              {t("form.name")}
            </label>
            <input
              id="name"
              {...register("name")}
              placeholder={t("form.name")}
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.name
                  ? "border-destructive text-destructive-foreground"
                  : "border-border/60"
              } bg-surface/20 focus:outline-none focus:ring-2 focus:ring-accent/50 transition`}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
            />
            {errors.name && (
              <p id="name-error" className="mt-1 text-sm text-destructive">
                {tErrors(errors.name.message || "form.errors.nameRequired")}
              </p>
            )}
          </div>
          <div>
            <label className="sr-only" htmlFor="email">
              {t("form.email")}
            </label>
            <input
              id="email"
              type="email"
              {...register("email")}
              placeholder={t("form.email")}
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.email
                  ? "border-destructive text-destructive-foreground"
                  : "border-border/60"
              } bg-surface/20 focus:outline-none focus:ring-2 focus:ring-accent/50 transition`}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && (
              <p id="email-error" className="mt-1 text-sm text-destructive">
                {tErrors(errors.email.message || "form.errors.emailInvalid")}
              </p>
            )}
          </div>
          <div>
            <label className="sr-only" htmlFor="message">
              {t("form.message")}
            </label>
            <textarea
              id="message"
              rows={5}
              {...register("message")}
              placeholder={t("form.message")}
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.message
                  ? "border-destructive text-destructive-foreground"
                  : "border-border/60"
              } bg-surface/20 focus:outline-none focus:ring-2 focus:ring-accent/50 transition resize-none`}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "message-error" : undefined}
            />
            {errors.message && (
              <p id="message-error" className="mt-1 text-sm text-destructive">
                {tErrors(errors.message.message || "form.errors.messageMin")}
              </p>
            )}
          </div>
          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={isSubmitting || status === "sending"}
              className="relative inline-flex cursor-pointer items-center px-6 py-3 rounded-lg border border-accent-green text-accent-green font-semibold overflow-hidden group transition-all disabled:opacity-60"
            >
              <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                {t("form.button")}
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-accent-teal translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
            </button>
            <div className="ml-2 text-sm">
              {status === "sending" && (
                <span className="text-muted-foreground">
                  {t("status.sending")}
                </span>
              )}
              {status === "success" && (
                <span className="text-success">{t("status.success")}</span>
              )}
              {status === "error" && (
                <span className="text-destructive">{t("status.error")}</span>
              )}
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">{t("note")}</p>
        </form>
      </motion.div>
    </section>
  );
}
