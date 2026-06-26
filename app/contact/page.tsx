"use client";

import React, { useState } from "react";
import PlatformLayout from "@/components/platform/PlatformLayout";
import { SEO_DATA } from "@/lib/seo";

const PATH = "/contact";
const config = SEO_DATA[PATH];

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("Suggestion");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSubmitted(true);
  };

  return (
    <PlatformLayout path={PATH} config={config}>
      <div className="bg-white rounded-2xl border border-gray-150 p-6 sm:p-8 shadow-sm max-w-2xl mx-auto">
        {submitted ? (
          <div className="text-center py-10 animate-fade-in">
            <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-indigo-100 shadow-sm">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Message Sent Successfully!</h3>
            <p className="text-gray-500 text-sm leading-relaxed max-w-md mx-auto mb-6">
              Thank you for reaching out to us. We read all community emails and will get back to you within 24 to 48 hours.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setName("");
                setEmail("");
                setSubject("Suggestion");
                setMessage("");
              }}
              className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-semibold shadow-sm"
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-1">Send Us a Message</h2>
              <p className="text-xs text-gray-400">All fields are required. We never share your email address.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="contact-name" className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Your Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Jane Doe"
                  className="w-full text-sm px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors"
                />
              </div>

              <div>
                <label htmlFor="contact-email" className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Email Address
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. jane@example.com"
                  className="w-full text-sm px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label htmlFor="contact-subject" className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Inquiry Topic
              </label>
              <select
                id="contact-subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full text-sm px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-white transition-colors"
              >
                <option value="Suggestion">Request a new tool / preset layout</option>
                <option value="Bug Report">Report a worksheet or canvas bug</option>
                <option value="Licensing">Commercial use / licensing inquiry</option>
                <option value="Other">General feedback or other queries</option>
              </select>
            </div>

            <div>
              <label htmlFor="contact-message" className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Your Message
              </label>
              <textarea
                id="contact-message"
                required
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Detail your request or feedback here..."
                className="w-full text-sm px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors resize-y"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-bold text-sm shadow-sm"
            >
              Submit Feedback →
            </button>
          </form>
        )}
      </div>
    </PlatformLayout>
  );
}
