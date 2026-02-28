"use client";

import { useTranslations } from "next-intl";
import { useState, type FormEvent } from "react";

type Status = "idle" | "sending" | "success" | "error";

export default function ContactForm() {
  const t = useTranslations("Contact");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
        }),
      });

      if (!res.ok) throw new Error();
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="contact-success">
        <p className="contact-success-title">{t("successTitle")}</p>
        <p>{t("successMsg")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <div className="contact-field">
        <label htmlFor="contact-name">{t("nameLabel")}</label>
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          placeholder={t("namePlaceholder")}
          autoComplete="name"
        />
      </div>

      <div className="contact-field">
        <label htmlFor="contact-email">{t("emailLabel")}</label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          placeholder={t("emailPlaceholder")}
          autoComplete="email"
        />
      </div>

      <div className="contact-field">
        <label htmlFor="contact-message">{t("messageLabel")}</label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={6}
          placeholder={t("messagePlaceholder")}
        />
      </div>

      {status === "error" && (
        <p className="contact-error">{t("errorMsg")}</p>
      )}

      <button type="submit" className="contact-submit" disabled={status === "sending"}>
        {status === "sending" ? t("sending") : t("submitBtn")}
      </button>
    </form>
  );
}
