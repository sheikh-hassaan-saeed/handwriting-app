"use client";

import React, { useState } from "react";
import { CONTACT_EMAIL } from "@/lib/constants";

const inputClass =
  "w-full text-sm px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors";
const labelClass = "block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("Tool request");
  const [message, setMessage] = useState("");
  const [opened, setOpened] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !message) return;
    // No backend: the form composes an email in the visitor's own mail app.
    const body = `${message}\n\n— ${name}`;
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      `[HandwritingMaker] ${subject}`
    )}&body=${encodeURIComponent(body)}`;
    setOpened(true);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-150 p-6 sm:p-8 shadow-sm max-w-2xl mx-auto">
      <h2 className="text-xl font-bold text-gray-800 mb-1">Email us</h2>
      <p className="text-sm text-gray-500 mb-6">
        Write to{" "}
        <a href={`mailto:${CONTACT_EMAIL}`} className="text-indigo-600 font-semibold hover:underline">
          {CONTACT_EMAIL}
        </a>{" "}
        directly, or fill in the form below and it will open your email app with the message ready to send.
      </p>

      {opened && (
        <div className="mb-6 rounded-lg border border-indigo-100 bg-indigo-50 p-4 text-sm text-gray-700">
          Your email app should now be open with your message filled in. Press send there to deliver it. If nothing
          opened, copy your message and send it to {CONTACT_EMAIL}.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="contact-name" className={labelClass}>Your Name</label>
          <input id="contact-name" type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Jane Doe" className={inputClass} />
        </div>
        <div>
          <label htmlFor="contact-subject" className={labelClass}>Topic</label>
          <select id="contact-subject" value={subject} onChange={(e) => setSubject(e.target.value)} className={`${inputClass} bg-white`}>
            <option value="Tool request">Request a new tool or layout</option>
            <option value="Bug report">Report a bug in a worksheet or generator</option>
            <option value="Licensing">Commercial use question</option>
            <option value="Other">Other feedback</option>
          </select>
        </div>
        <div>
          <label htmlFor="contact-message" className={labelClass}>Your Message</label>
          <textarea id="contact-message" required rows={5} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="What would you like to tell us?" className={`${inputClass} resize-y`} />
        </div>
        <button type="submit" className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-bold text-sm shadow-sm">
          Open in my email app →
        </button>
      </form>
    </div>
  );
}
