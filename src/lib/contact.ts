import { z } from "zod";

export const contactErrorKeys = [
  "nameMin",
  "emailInvalid",
  "messageMin",
] as const;

export type ContactErrorKey = (typeof contactErrorKeys)[number];

export const ContactSchema = z.object({
  name: z.string().min(2, { message: "nameMin" satisfies ContactErrorKey }),
  email: z
    .string()
    .email({ message: "emailInvalid" satisfies ContactErrorKey }),
  message: z
    .string()
    .min(10, { message: "messageMin" satisfies ContactErrorKey }),
});

export type ContactForm = z.infer<typeof ContactSchema>;

export function isContactErrorKey(
  value: string | undefined,
): value is ContactErrorKey {
  return contactErrorKeys.includes(value as ContactErrorKey);
}

export function escapeTelegramHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export const inputClass =
  "w-full rounded-lg border bg-background/80 px-4 py-3 text-sm text-foreground transition-[border-color,box-shadow] outline-none placeholder:text-text-muted focus-visible:ring-2 focus-visible:ring-brand/25 disabled:cursor-not-allowed disabled:opacity-50";
