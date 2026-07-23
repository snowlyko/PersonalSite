import React, { useState } from "react";
import { portfolioData } from "../portfolioData";

export default function Contact() {
  const { socials } = portfolioData;

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    setIsSubmitting(true);

    const apiKey = import.meta.env.VITE_WEB3FORMS_KEY || socials.web3FormsKey;

    // Check if key is unconfigured or placeholder
    if (!apiKey || apiKey === "YOUR_WEB3FORMS_ACCESS_KEY") {
      // Fallback: Simulate API submission locally so UI works
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
        setFormState({ name: "", email: "", message: "" });
        
        // Reset success after 5s
        setTimeout(() => setIsSuccess(false), 5000);
        
        console.warn(
          "Contact form submitted in simulated MOCK mode. To send real emails, get a free Access Key at https://web3forms.com and add it to your .env file as VITE_WEB3FORMS_KEY."
        );
      }, 1000);
      return;
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          access_key: apiKey,
          name: formState.name,
          email: formState.email,
          message: formState.message,
          subject: `New Portfolio Message from ${formState.name}`,
          from_name: "Developer Portfolio Contact"
        })
      });

      const result = await response.json();
      if (result.success) {
        setIsSuccess(true);
        setFormState({ name: "", email: "", message: "" });
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        console.error("Web3Forms Submission Error:", result);
        alert("Failed to send message: " + (result.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Contact Form Submission Error:", error);
      alert("An error occurred while sending the message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Extract clean email address for text display
  const rawEmail = socials.email.replace("mailto:", "");

  return (
    <div>
      <div className="modal-header">
        <h2 className="modal-title">Get in Touch</h2>
      </div>

      <div className="contact-container">
        {/* Left Column: Info */}
        <div className="contact-info">
          <div>
            <p className="contact-intro">
              Have an interesting project, collaboration, or internship opportunity? Drop me a message and I'll get back to you as soon as possible.
            </p>

            <div className="contact-details">
              <a href={socials.email} className="contact-item">
                <div className="contact-icon">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <span>{rawEmail}</span>
              </a>

              <a
                href={socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-item"
              >
                <div className="contact-icon">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </div>
                <span>LinkedIn Profile</span>
              </a>

              <a
                href={socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-item"
              >
                <div className="contact-icon">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                  </svg>
                </div>
                <span>GitHub Profile</span>
              </a>
            </div>
          </div>

          <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
            © {new Date().getFullYear()} Suryanarayan K S. All rights reserved.
          </div>
        </div>

        {/* Right Column: Form */}
        <div>
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="contact-name">Name</label>
              <input
                type="text"
                id="contact-name"
                name="name"
                value={formState.name}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                className="form-input"
                placeholder="Your Name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="contact-email">Email Address</label>
              <input
                type="email"
                id="contact-email"
                name="email"
                value={formState.email}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                className="form-input"
                placeholder="your.email@example.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="contact-message">Message</label>
              <textarea
                id="contact-message"
                name="message"
                value={formState.message}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                className="form-input form-textarea"
                placeholder="Write your message here..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !formState.name || !formState.email || !formState.message}
              className="btn btn-primary submit-btn"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>

          {isSuccess && (
            <div className="form-success-msg">
              ✓ Message sent! Thank you for reaching out.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
